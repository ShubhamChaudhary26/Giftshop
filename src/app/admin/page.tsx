// app/admin/page.tsx
'use client'
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { supabase } from '@/lib/supabase'
import toast, { Toaster } from 'react-hot-toast'
import { X, Upload } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { integralCF } from '@/styles/fonts'

interface Product {
  id?: number
  title: string
  author: string
  price: number
  discount_percentage: number
  rating: number
  src_url: string
  gallery?: string[]
  category: string
  stock: number
  is_new_arrival: boolean
  is_top_selling: boolean
  description?: string
}

const CATEGORIES = [
  'AI & ML', 'Programming', 'Web Development', 'Data Science', 'Cybersecurity', 'Cloud Computing',
  'Database', 'Networking', 'Operating Systems', 'Software Engineering', 'Mobile Development',
  'DevOps', 'Blockchain', 'Game Development', 'Other'
]

const MAX_GALLERY_IMAGES = 3

// Guard hook (always called)
function useAdminGuard() {
  const router = useRouter()
  const supabaseClient = createClientComponentClient()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const run = async () => {
      const { data: { user } } = await supabaseClient.auth.getUser()
      if (!user) {
        router.replace('/admin/login?redirectTo=/admin')
        return
      }
      const allowed = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
        .split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
      const email = (user.email || '').toLowerCase()
      if (allowed.length && !allowed.includes(email)) {
        await supabaseClient.auth.signOut()
        router.replace('/admin/login?err=forbidden')
        return
      }
      setReady(true)
    }
    run()
  }, [router, supabaseClient])

  return ready
}

export default function AdminDashboard() {
  const ready = useAdminGuard()
  const router = useRouter()
  const authClient = createClientComponentClient()

  const [products, setProducts] = useState<Product[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [customCategory, setCustomCategory] = useState('')
  const [formData, setFormData] = useState<Product>({
    title: '', author: '', price: 0, discount_percentage: 0, rating: 0,
    src_url: '', gallery: [], category: 'AI & ML', stock: 0,
    is_new_arrival: false, is_top_selling: false, description: ''
  })

  useEffect(() => {
    if (!ready) return
    fetchProducts()
  }, [ready])

  async function fetchProducts() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await authClient.auth.signOut()
    router.replace('/admin/login')
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    const currentGalleryCount = formData.gallery?.length || 0
    const remainingSlots = MAX_GALLERY_IMAGES - currentGalleryCount
    if (remainingSlots <= 0) {
      toast.error(`Maximum ${MAX_GALLERY_IMAGES} images allowed!`)
      return
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots)
    setUploadingGallery(true)
    const uploadedUrls: string[] = []

    try {
      for (const file of filesToUpload) {
        const ext = file.name.split('.').pop()
        const fileName = `gallery_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
        const { error } = await supabase.storage.from('product-images').upload(fileName, file)
        if (error) throw error
        const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(fileName)
        uploadedUrls.push(publicUrl)
      }

      setFormData(prev => {
        const newGal = [...(prev.gallery || []), ...uploadedUrls].slice(0, MAX_GALLERY_IMAGES)
        const newSrc = prev.src_url || newGal[0] || ''
        return { ...prev, gallery: newGal, src_url: newSrc }
      })
      toast.success(`${uploadedUrls.length} image(s) uploaded!`)
    } catch (error: any) {
      toast.error(`Failed to upload images: ${error.message}`)
    } finally {
      setUploadingGallery(false)
      e.currentTarget.value = ''
    }
  }

  function removeGalleryImage(index: number) {
    setFormData(prev => {
      const removed = prev.gallery?.[index]
      const newGal = prev.gallery?.filter((_, i) => i !== index) || []
      const newSrc = prev.src_url === removed ? (newGal[0] || '') : prev.src_url
      return { ...prev, gallery: newGal, src_url: newSrc }
    })
    toast.success('Image removed')
  }

  function setAsMainImage(url: string) {
    setFormData(prev => ({ ...prev, src_url: url }))
    toast.success('Main image updated!')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.gallery || formData.gallery.length === 0) {
      toast.error('Please upload at least one image.')
      return
    }
    const finalCategory = customCategory || formData.category
    const payload: Product = {
      ...formData,
      category: finalCategory,
      gallery: formData.gallery.slice(0, MAX_GALLERY_IMAGES),
      price: Number(formData.price || 0),
      rating: Number(formData.rating || 0),
      discount_percentage: Number(formData.discount_percentage || 0),
      stock: Number(formData.stock || 0)
    }

    try {
      if (editingProduct?.id) {
        const { error } = await supabase.from('products').update(payload).eq('id', editingProduct.id)
        if (error) throw error
        toast.success('Product updated!')
      } else {
        const { error } = await supabase.from('products').insert([payload])
        if (error) throw error
        toast.success('Product added!')
      }
      setShowModal(false)
      resetForm()
      fetchProducts()
    } catch (error: any) {
      toast.error(`Failed to save product: ${error.message}`)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this product?')) return
    try {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) throw error
      toast.success('Product deleted!')
      fetchProducts()
    } catch {
      toast.error('Failed to delete product')
    }
  }

  function handleEdit(product: Product) {
    setEditingProduct(product)
    setFormData({
      title: product.title || '',
      author: product.author || '',
      price: Number(product.price || 0),
      discount_percentage: Number(product.discount_percentage || 0),
      rating: Number(product.rating || 0),
      src_url: product.src_url || '',
      gallery: (product.gallery || []).slice(0, MAX_GALLERY_IMAGES),
      category: product.category || 'AI & ML',
      stock: Number(product.stock || 0),
      is_new_arrival: !!product.is_new_arrival,
      is_top_selling: !!product.is_top_selling,
      description: product.description || '',
      id: product.id
    })
    setShowModal(true)
  }

  function resetForm() {
    setFormData({
      title: '', author: '', price: 0, discount_percentage: 0, rating: 0,
      src_url: '', gallery: [], category: 'AI & ML', stock: 0,
      is_new_arrival: false, is_top_selling: false, description: ''
    })
    setEditingProduct(null)
    setCustomCategory('')
  }

  if (!ready) return <div className="min-h-screen flex items-center justify-center">Checking access…</div>
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading products…</div>

  const uniqueCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean)))

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-black text-white p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className={cn([integralCF.className, "text-3xl uppercase"])}>Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { resetForm(); setShowModal(true); }}
              className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200"
            >
              + Add Product
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow"><h3 className="text-gray-600 text-sm">Total Products</h3><p className="text-3xl font-bold">{products.length}</p></div>
          <div className="bg-white p-6 rounded-lg shadow"><h3 className="text-gray-600 text-sm">Categories</h3><p className="text-3xl font-bold">{uniqueCategories.length}</p></div>
          <div className="bg-white p-6 rounded-lg shadow"><h3 className="text-gray-600 text-sm">New Arrivals</h3><p className="text-3xl font-bold">{products.filter(p => p.is_new_arrival).length}</p></div>
          <div className="bg-white p-6 rounded-lg shadow"><h3 className="text-gray-600 text-sm">Top Selling</h3><p className="text-3xl font-bold">{products.filter(p => p.is_top_selling).length}</p></div>
          <div className="bg-white p-6 rounded-lg shadow"><h3 className="text-gray-600 text-sm">Low Stock (&lt;10)</h3><p className="text-3xl font-bold">{products.filter(p => p.stock < 10).length}</p></div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Image</th><th className="p-4 text-left">Title</th><th className="p-4 text-left">Author</th>
                <th className="p-4 text-left">Price</th><th className="p-4 text-left">Stock</th><th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Gallery</th><th className="p-4 text-left">Status</th><th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <img src={product.src_url || '/images/book1.webp'} alt={product.title} className="w-16 h-20 object-cover rounded" onError={(e) => (e.currentTarget.src = '/images/book1.webp')}/>
                  </td>
                  <td className="p-4 font-semibold">{product.title}</td>
                  <td className="p-4">{product.author}</td>
                  <td className="p-4">
                    <div className="font-bold">₹{product.price}</div>
                    {product.discount_percentage > 0 && <span className="text-green-600 text-sm">-{product.discount_percentage}%</span>}
                  </td>
                  <td className="p-4">
                    <span className={cn("px-2 py-1 rounded text-sm", product.stock > 10 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}>{product.stock}</span>
                  </td>
                  <td className="p-4"><span className="bg-gray-100 px-2 py-1 rounded text-sm">{product.category}</span></td>
                  <td className="p-4"><span className="text-sm text-gray-600">{product.gallery?.length || 0} images</span></td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {product.is_new_arrival && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">New</span>}
                      {product.is_top_selling && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Top</span>}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(product)} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
                      <button onClick={() => handleDelete(product.id!)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-y-auto py-10">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-5xl mx-4 overflow-hidden"
          >
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b p-5">
              <h2 className="text-2xl font-bold">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-500 hover:text-black">
                <X size={24} />
              </button>
            </div>

            <div className="max-h-[80vh] overflow-y-auto p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Section */}
                  <div className="space-y-4">
                    <Field label="Title *">
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-3 border rounded-lg focus:border-black outline-none"
                        required
                      />
                    </Field>

                    <Field label="Author *">
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full p-3 border rounded-lg focus:border-black outline-none"
                        required
                      />
                    </Field>

                    <Field label="Category *">
                      <select
                        value={formData.category}
                        onChange={(e) => {
                          setFormData({ ...formData, category: e.target.value })
                          setCustomCategory('')
                        }}
                        className="w-full p-3 border rounded-lg focus:border-black outline-none"
                      >
                        {CATEGORIES.map((cat) => <option key={cat}>{cat}</option>)}
                      </select>
                      <input
                        type="text"
                        placeholder="Or enter custom category"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className="w-full p-3 border rounded-lg mt-2 focus:border-black outline-none"
                      />
                    </Field>

                    <Field label="Description">
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-3 border rounded-lg focus:border-black outline-none"
                        rows={4}
                      />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Price (₹) *">
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                          className="w-full p-3 border rounded-lg focus:border-black outline-none"
                          required
                        />
                      </Field>
                      <Field label="Stock *">
                        <input
                          type="number"
                          value={formData.stock}
                          onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                          className="w-full p-3 border rounded-lg focus:border-black outline-none"
                          required
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Discount %">
                        <input
                          type="number"
                          value={formData.discount_percentage}
                          onChange={(e) => setFormData({ ...formData, discount_percentage: Number(e.target.value) })}
                          className="w-full p-3 border rounded-lg focus:border-black outline-none"
                        />
                      </Field>
                      <Field label="Rating (0–5)">
                        <input
                          type="number"
                          value={formData.rating}
                          onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                          className="w-full p-3 border rounded-lg focus:border-black outline-none"
                          step="0.1"
                          max={5}
                        />
                      </Field>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.is_new_arrival}
                          onChange={(e) => setFormData({ ...formData, is_new_arrival: e.target.checked })}
                        />
                        New Arrival
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.is_top_selling}
                          onChange={(e) => setFormData({ ...formData, is_top_selling: e.target.checked })}
                        />
                        Top Selling
                      </label>
                    </div>
                  </div>

                  {/* Right Section (Gallery) */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold">
                      Product Images (Max {MAX_GALLERY_IMAGES})
                    </label>
                    <label className="block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                        className="hidden"
                      />
                      <Upload className="mx-auto mb-2" size={40} />
                      <p className="text-sm text-gray-600">
                        {formData.gallery?.length || 0}/{MAX_GALLERY_IMAGES} uploaded
                      </p>
                    </label>

                    {formData.gallery && formData.gallery.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        {formData.gallery.map((img, index) => (
                          <div key={index} className="relative group">
                            <img src={img} alt="" className="w-full h-32 object-cover rounded-lg border" />
                            {formData.src_url === img && (
                              <div className="absolute top-1 left-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded">MAIN</div>
                            )}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2">
                              <button type="button" onClick={() => setAsMainImage(img)} className="bg-white text-black px-3 py-1 rounded text-sm font-semibold hover:bg-gray-200">
                                Set Main
                              </button>
                              <button type="button" onClick={() => removeGalleryImage(index)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                  <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="px-6 py-3 border rounded-lg hover:bg-gray-100 font-semibold">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold">
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-semibold mb-1">{label}</label>
    {children}
  </div>
)