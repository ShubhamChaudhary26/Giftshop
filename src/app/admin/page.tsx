// app/admin/page.tsx
'use client'
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { supabase } from '@/lib/supabase'
import toast, { Toaster } from 'react-hot-toast'
import { 
  X, Upload, Layers, FolderTree, Package, 
  Plus, Edit2, Trash2, LogOut, Image as ImageIcon
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { integralCF } from '@/styles/fonts'
import Image from 'next/image'

// Types
interface Category {
  id: number
  name: string
  slug: string
  description?: string
  image_url?: string
  is_active: boolean
}

interface Subcategory {
  id: number
  category_id: number
  name: string
  slug: string
  description?: string
  image_url?: string
  is_active: boolean
}

interface Product {
  id?: number
  title: string
  author: string
  price: number
  discount_percentage: number
  rating: number
  src_url: string
  gallery?: string[]
  category_id: number
  subcategory_id: number
  category?: string
  subcategory?: string
  stock: number
  is_new_arrival: boolean
  is_top_selling: boolean
  description?: string
}

const MAX_GALLERY_IMAGES = 3

// Admin Guard
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

  // Sidebar State
  const [activeTab, setActiveTab] = useState<'categories' | 'subcategories' | 'products'>('categories')

  // Data States
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Category Modal
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '', image_url: '' })
  const [uploadingCategoryImage, setUploadingCategoryImage] = useState(false)

  // Subcategory Modal
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false)
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null)
  const [selectedCategoryForSub, setSelectedCategoryForSub] = useState<number | null>(null)
  const [subcategoryForm, setSubcategoryForm] = useState({ name: '', description: '', category_id: 0, image_url: '' })
  const [uploadingSubcategoryImage, setUploadingSubcategoryImage] = useState(false)

  // Product Modal
  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [productForm, setProductForm] = useState<Product>({
    title: '', author: '', price: 0, discount_percentage: 0, rating: 0,
    src_url: '', gallery: [], category_id: 0, subcategory_id: 0,
    stock: 0, is_new_arrival: false, is_top_selling: false, description: ''
  })

  useEffect(() => {
    if (!ready) return
    fetchAll()
  }, [ready])

  async function fetchAll() {
    setLoading(true)
    await Promise.all([fetchCategories(), fetchSubcategories(), fetchProducts()])
    setLoading(false)
  }

  async function fetchCategories() {
    const { data, error } = await supabase.from('categories').select('*').order('name')
    if (error) toast.error('Failed to fetch categories')
    else setCategories(data || [])
  }

  async function fetchSubcategories() {
    const { data, error } = await supabase.from('subcategories').select('*').order('name')
    if (error) toast.error('Failed to fetch subcategories')
    else setSubcategories(data || [])
  }

  async function fetchProducts() {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (error) toast.error('Failed to fetch products')
    else setProducts(data || [])
  }

  async function handleLogout() {
    await authClient.auth.signOut()
    router.replace('/admin/login')
  }

  // ============================================
  // 🖼️ CATEGORY IMAGE UPLOAD
  // ============================================
  async function handleCategoryImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingCategoryImage(true)
    try {
      const ext = file.name.split('.').pop()
      const fileName = `category_${Date.now()}.${ext}`
      
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName)

      setCategoryForm(prev => ({ ...prev, image_url: publicUrl }))
      toast.success('Image uploaded!')
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`)
    } finally {
      setUploadingCategoryImage(false)
      e.target.value = ''
    }
  }

  function removeCategoryImage() {
    setCategoryForm(prev => ({ ...prev, image_url: '' }))
    toast.success('Image removed')
  }

  // ============================================
  // 🖼️ SUBCATEGORY IMAGE UPLOAD
  // ============================================
  async function handleSubcategoryImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingSubcategoryImage(true)
    try {
      const ext = file.name.split('.').pop()
      const fileName = `subcategory_${Date.now()}.${ext}`
      
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName)

      setSubcategoryForm(prev => ({ ...prev, image_url: publicUrl }))
      toast.success('Image uploaded!')
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`)
    } finally {
      setUploadingSubcategoryImage(false)
      e.target.value = ''
    }
  }

  function removeSubcategoryImage() {
    setSubcategoryForm(prev => ({ ...prev, image_url: '' }))
    toast.success('Image removed')
  }

  // ============================================
  // 📦 CATEGORY MANAGEMENT
  // ============================================
  function openCategoryModal(category?: Category) {
    if (category) {
      setEditingCategory(category)
      setCategoryForm({ 
        name: category.name, 
        description: category.description || '', 
        image_url: category.image_url || '' 
      })
    } else {
      setEditingCategory(null)
      setCategoryForm({ name: '', description: '', image_url: '' })
    }
    setShowCategoryModal(true)
  }

  async function handleCategorySubmit(e: React.FormEvent) {
    e.preventDefault()
    const slug = categoryForm.name.toLowerCase().replace(/\s+/g, '-')
    const payload = { ...categoryForm, slug, is_active: true }

    try {
      if (editingCategory) {
        const { error } = await supabase.from('categories').update(payload).eq('id', editingCategory.id)
        if (error) throw error
        toast.success('Category updated!')
      } else {
        const { error } = await supabase.from('categories').insert([payload])
        if (error) throw error
        toast.success('Category added!')
      }
      setShowCategoryModal(false)
      fetchCategories()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  async function deleteCategory(id: number) {
    if (!confirm('Delete this category? All subcategories and products will be affected!')) return
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id)
      if (error) throw error
      toast.success('Category deleted!')
      fetchCategories()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  // ============================================
  // 📂 SUBCATEGORY MANAGEMENT
  // ============================================
  function openSubcategoryModal(subcategory?: Subcategory) {
    if (subcategory) {
      setEditingSubcategory(subcategory)
      setSubcategoryForm({ 
        name: subcategory.name, 
        description: subcategory.description || '', 
        category_id: subcategory.category_id,
        image_url: subcategory.image_url || ''
      })
    } else {
      setEditingSubcategory(null)
      setSubcategoryForm({ 
        name: '', 
        description: '', 
        category_id: selectedCategoryForSub || 0,
        image_url: ''
      })
    }
    setShowSubcategoryModal(true)
  }

  async function handleSubcategorySubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!subcategoryForm.category_id) {
      toast.error('Please select a category')
      return
    }
    const slug = subcategoryForm.name.toLowerCase().replace(/\s+/g, '-')
    const payload = { ...subcategoryForm, slug, is_active: true }

    try {
      if (editingSubcategory) {
        const { error } = await supabase.from('subcategories').update(payload).eq('id', editingSubcategory.id)
        if (error) throw error
        toast.success('Subcategory updated!')
      } else {
        const { error } = await supabase.from('subcategories').insert([payload])
        if (error) throw error
        toast.success('Subcategory added!')
      }
      setShowSubcategoryModal(false)
      fetchSubcategories()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  async function deleteSubcategory(id: number) {
    if (!confirm('Delete this subcategory?')) return
    try {
      const { error } = await supabase.from('subcategories').delete().eq('id', id)
      if (error) throw error
      toast.success('Subcategory deleted!')
      fetchSubcategories()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  // ============================================
  // 📦 PRODUCT MANAGEMENT (Existing code...)
  // ============================================
  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    const currentGalleryCount = productForm.gallery?.length || 0
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

      setProductForm(prev => {
        const newGal = [...(prev.gallery || []), ...uploadedUrls].slice(0, MAX_GALLERY_IMAGES)
        const newSrc = prev.src_url || newGal[0] || ''
        return { ...prev, gallery: newGal, src_url: newSrc }
      })
      toast.success(`${uploadedUrls.length} image(s) uploaded!`)
    } catch (error: any) {
      toast.error(`Failed to upload: ${error.message}`)
    } finally {
      setUploadingGallery(false)
      e.currentTarget.value = ''
    }
  }

  function removeGalleryImage(index: number) {
    setProductForm(prev => {
      const removed = prev.gallery?.[index]
      const newGal = prev.gallery?.filter((_, i) => i !== index) || []
      const newSrc = prev.src_url === removed ? (newGal[0] || '') : prev.src_url
      return { ...prev, gallery: newGal, src_url: newSrc }
    })
  }

  function setAsMainImage(url: string) {
    setProductForm(prev => ({ ...prev, src_url: url }))
    toast.success('Main image updated!')
  }

  function openProductModal(product?: Product) {
    if (product) {
      setEditingProduct(product)
      setProductForm({ ...product, gallery: product.gallery || [] })
    } else {
      setEditingProduct(null)
      setProductForm({
        title: '', author: '', price: 0, discount_percentage: 0, rating: 0,
        src_url: '', gallery: [], category_id: 0, subcategory_id: 0,
        stock: 0, is_new_arrival: false, is_top_selling: false, description: ''
      })
    }
    setShowProductModal(true)
  }

  async function handleProductSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!productForm.gallery || productForm.gallery.length === 0) {
      toast.error('Please upload at least one image')
      return
    }
    if (!productForm.category_id || !productForm.subcategory_id) {
      toast.error('Please select category and subcategory')
      return
    }

    const payload = {
      ...productForm,
      gallery: productForm.gallery.slice(0, MAX_GALLERY_IMAGES),
      price: Number(productForm.price),
      rating: Number(productForm.rating),
      discount_percentage: Number(productForm.discount_percentage),
      stock: Number(productForm.stock)
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
      setShowProductModal(false)
      fetchProducts()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  async function deleteProduct(id: number) {
    if (!confirm('Delete this product?')) return
    try {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) throw error
      toast.success('Product deleted!')
      fetchProducts()
    } catch {
      toast.error('Failed to delete')
    }
  }

  if (!ready) return <div className="min-h-screen flex items-center justify-center">Checking access…</div>
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading…</div>

  const getCategoryName = (id: number) => categories.find(c => c.id === id)?.name || '-'
  const getSubcategoryName = (id: number) => subcategories.find(s => s.id === id)?.name || '-'
  const filteredSubcategories = selectedCategoryForSub 
    ? subcategories.filter(s => s.category_id === selectedCategoryForSub)
    : subcategories

  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* ============================================ */}
      {/* 🎨 SIDEBAR */}
      {/* ============================================ */}
      <aside className="w-64 bg-black text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className={cn([integralCF.className, "text-2xl uppercase"])}>Hello Mayur</h1>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('categories')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition",
              activeTab === 'categories' 
                ? "bg-white text-black font-semibold" 
                : "hover:bg-gray-800"
            )}
          >
            <Layers size={20} />
            <span>Categories</span>
          </button>

          <button
            onClick={() => setActiveTab('subcategories')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition",
              activeTab === 'subcategories' 
                ? "bg-white text-black font-semibold" 
                : "hover:bg-gray-800"
            )}
          >
            <FolderTree size={20} />
            <span>Subcategories</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition",
              activeTab === 'products' 
                ? "bg-white text-black font-semibold" 
                : "hover:bg-gray-800"
            )}
          >
            <Package size={20} />
            <span>Products</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ============================================ */}
      {/* 📄 MAIN CONTENT */}
      {/* ============================================ */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b px-8 py-6 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
            <p className="text-sm text-gray-500">
              {activeTab === 'categories' && `${categories.length} categories`}
              {activeTab === 'subcategories' && `${subcategories.length} subcategories`}
              {activeTab === 'products' && `${products.length} products`}
            </p>
          </div>

          <button
            onClick={() => {
              if (activeTab === 'categories') openCategoryModal()
              else if (activeTab === 'subcategories') openSubcategoryModal()
              else openProductModal()
            }}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            <Plus size={20} />
            Add {activeTab === 'categories' ? 'Category' : activeTab === 'subcategories' ? 'Subcategory' : 'Product'}
          </button>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* ============================================ */}
            {/* 📦 CATEGORIES TAB */}
            {/* ============================================ */}
            {activeTab === 'categories' && (
              <motion.div
                key="categories"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map(cat => (
                    <div key={cat.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                      {/* Category Image */}
                      <div className="aspect-video relative bg-gray-100">
                        {cat.image_url ? (
                          <Image
                            src={cat.image_url}
                            alt={cat.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-6xl text-gray-300">
                            🎁
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{cat.name}</h3>
                            <p className="text-sm text-gray-500">{cat.slug}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openCategoryModal(cat)}
                              className="p-2 hover:bg-gray-100 rounded"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => deleteCategory(cat.id)}
                              className="p-2 hover:bg-red-100 text-red-600 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{cat.description || 'No description'}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{subcategories.filter(s => s.category_id === cat.id).length} subcategories</span>
                          <span>{products.filter(p => p.category_id === cat.id).length} products</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ============================================ */}
            {/* 📂 SUBCATEGORIES TAB */}
            {/* ============================================ */}
            {activeTab === 'subcategories' && (
              <motion.div
                key="subcategories"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Category Filter */}
                <div className="mb-6 flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedCategoryForSub(null)}
                    className={cn(
                      "px-4 py-2 rounded-lg transition",
                      !selectedCategoryForSub ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                    )}
                  >
                    All ({subcategories.length})
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategoryForSub(cat.id)}
                      className={cn(
                        "px-4 py-2 rounded-lg transition",
                        selectedCategoryForSub === cat.id ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                      )}
                    >
                      {cat.name} ({subcategories.filter(s => s.category_id === cat.id).length})
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredSubcategories.map(sub => (
                    <div key={sub.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition">
                      {/* Subcategory Image */}
                      <div className="aspect-square relative bg-gray-100">
                        {sub.image_url ? (
                          <Image
                            src={sub.image_url}
                            alt={sub.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-5xl text-gray-300">
                            🏷️
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{sub.name}</h4>
                            <p className="text-xs text-gray-500">{getCategoryName(sub.category_id)}</p>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => openSubcategoryModal(sub)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => deleteSubcategory(sub.id)}
                              className="p-1 hover:bg-red-100 text-red-600 rounded"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">{products.filter(p => p.subcategory_id === sub.id).length} products</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ============================================ */}
            {/* 📦 PRODUCTS TAB (Same as before) */}
            {/* ============================================ */}
            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-4 text-left">Image</th>
                        <th className="p-4 text-left">Title</th>
                        <th className="p-4 text-left">Category</th>
                        <th className="p-4 text-left">Subcategory</th>
                        <th className="p-4 text-left">Price</th>
                        <th className="p-4 text-left">Stock</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id} className="border-t hover:bg-gray-50">
                          <td className="p-4">
                            <img 
                              src={product.src_url || '/placeholder.png'} 
                              alt={product.title} 
                              className="w-16 h-16 object-cover rounded" 
                            />
                          </td>
                          <td className="p-4 font-semibold max-w-[200px] truncate">{product.title}</td>
                          <td className="p-4">
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                              {getCategoryName(product.category_id)}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              {getSubcategoryName(product.subcategory_id)}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="font-bold">₹{product.price}</div>
                            {product.discount_percentage > 0 && (
                              <span className="text-green-600 text-xs">-{product.discount_percentage}%</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className={cn(
                              "px-2 py-1 rounded text-xs",
                              product.stock > 10 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            )}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-1 flex-wrap">
                              {product.is_new_arrival && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">New</span>
                              )}
                              {product.is_top_selling && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Top</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => openProductModal(product)} 
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => deleteProduct(product.id!)} 
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {products.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      No products yet. Add your first product! 🎁
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ============================================ */}
      {/* 🎨 MODALS */}
      {/* ============================================ */}

    {/* ✅ CATEGORY MODAL - UPDATED */}
{/* ✅ CATEGORY MODAL - COMPACT & WIDE */}
{showCategoryModal && (
  <ModalOverlay onClose={() => {
    setShowCategoryModal(false)
    setCategoryForm({ name: '', description: '', image_url: '' })
    setEditingCategory(null)
  }}>
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto"
    >
      <h3 className="text-2xl font-bold mb-6">{editingCategory ? "Edit Category" : "Add New Category"}</h3>
      
      <form onSubmit={handleCategorySubmit} className="space-y-4">
        
        {/* Image Upload - Compact */}
        <Field label="Category Image">
          {categoryForm.image_url ? (
            <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={categoryForm.image_url}
                alt="Category"
                fill
                className="object-cover"
                unoptimized
              />
              <button
                type="button"
                onClick={removeCategoryImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
              <input
                type="file"
                accept="image/*"
                onChange={handleCategoryImageUpload}
                className="hidden"
                disabled={uploadingCategoryImage}
              />
              <ImageIcon className="mx-auto mb-2 text-gray-400" size={40} />
              <p className="text-sm font-medium text-gray-700">
                {uploadingCategoryImage ? 'Uploading...' : 'Click to upload image'}
              </p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP (800x600px recommended)</p>
            </label>
          )}
        </Field>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Category Name *">
            <input
              type="text"
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
              className="w-full p-3 border rounded-lg focus:border-black outline-none"
              placeholder="e.g., Mousepad"
              required
            />
          </Field>

          <Field label="Description">
            <input
              type="text"
              value={categoryForm.description}
              onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
              className="w-full p-3 border rounded-lg focus:border-black outline-none"
              placeholder="Brief description"
            />
          </Field>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <button 
            type="button" 
            onClick={() => {
              setShowCategoryModal(false)
              setCategoryForm({ name: '', description: '', image_url: '' })
              setEditingCategory(null)
            }}
            className="flex-1 px-6 py-3 border-2 rounded-lg hover:bg-gray-100 font-semibold"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={uploadingCategoryImage}
            className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 font-semibold"
          >
            {editingCategory ? 'Update' : 'Add Category'}
          </button>
        </div>
      </form>
    </motion.div>
  </ModalOverlay>
)}

{/* ✅ SUBCATEGORY MODAL - COMPACT & WIDE */}
{showSubcategoryModal && (
  <ModalOverlay onClose={() => {
    setShowSubcategoryModal(false)
    setSubcategoryForm({ name: '', description: '', category_id: 0, image_url: '' })
    setEditingSubcategory(null)
  }}>
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto"
    >
      <h3 className="text-2xl font-bold mb-6">{editingSubcategory ? "Edit Subcategory" : "Add New Subcategory"}</h3>
      
      <form onSubmit={handleSubcategorySubmit} className="space-y-4">
        
        {/* Image Upload - Compact */}
        <Field label="Subcategory Image">
          {subcategoryForm.image_url ? (
            <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={subcategoryForm.image_url}
                alt="Subcategory"
                fill
                className="object-cover"
                unoptimized
              />
              <button
                type="button"
                onClick={removeSubcategoryImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
              <input
                type="file"
                accept="image/*"
                onChange={handleSubcategoryImageUpload}
                className="hidden"
                disabled={uploadingSubcategoryImage}
              />
              <ImageIcon className="mx-auto mb-2 text-gray-400" size={40} />
              <p className="text-sm font-medium text-gray-700">
                {uploadingSubcategoryImage ? 'Uploading...' : 'Click to upload image'}
              </p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP (600x600px recommended)</p>
            </label>
          )}
        </Field>

        <div className="grid md:grid-cols-3 gap-4">
          <Field label="Parent Category *">
            <select
              value={subcategoryForm.category_id}
              onChange={(e) => setSubcategoryForm({ ...subcategoryForm, category_id: Number(e.target.value) })}
              className="w-full p-3 border rounded-lg focus:border-black outline-none"
              required
            >
              <option value="">-- Select --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </Field>

          <Field label="Subcategory Name *">
            <input
              type="text"
              value={subcategoryForm.name}
              onChange={(e) => setSubcategoryForm({ ...subcategoryForm, name: e.target.value })}
              className="w-full p-3 border rounded-lg focus:border-black outline-none"
              placeholder="e.g., Naruto"
              required
            />
          </Field>

          <Field label="Description">
            <input
              type="text"
              value={subcategoryForm.description}
              onChange={(e) => setSubcategoryForm({ ...subcategoryForm, description: e.target.value })}
              className="w-full p-3 border rounded-lg focus:border-black outline-none"
              placeholder="Brief description"
            />
          </Field>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <button 
            type="button" 
            onClick={() => {
              setShowSubcategoryModal(false)
              setSubcategoryForm({ name: '', description: '', category_id: 0, image_url: '' })
              setEditingSubcategory(null)
            }}
            className="flex-1 px-6 py-3 border-2 rounded-lg hover:bg-gray-100 font-semibold"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={uploadingSubcategoryImage}
            className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 font-semibold"
          >
            {editingSubcategory ? 'Update' : 'Add Subcategory'}
          </button>
        </div>
      </form>
    </motion.div>
  </ModalOverlay>
)}

      {/* Product Modal (same as before - already exists in your code) */}
      {showProductModal && (
        <ModalOverlay onClose={() => setShowProductModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b p-5">
              <h2 className="text-2xl font-bold">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setShowProductModal(false)} className="text-gray-500 hover:text-black">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <Field label="Product Title *">
                    <input
                      type="text"
                      value={productForm.title}
                      onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                      className="w-full p-3 border rounded-lg"
                      placeholder="e.g., Naruto Mousepad"
                      required
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Category *">
                      <select
                        value={productForm.category_id}
                        onChange={(e) => setProductForm({ ...productForm, category_id: Number(e.target.value), subcategory_id: 0 })}
                        className="w-full p-3 border rounded-lg"
                        required
                      >
                        <option value="">-- Select --</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Subcategory *">
                      <select
                        value={productForm.subcategory_id}
                        onChange={(e) => setProductForm({ ...productForm, subcategory_id: Number(e.target.value) })}
                        className="w-full p-3 border rounded-lg"
                        required
                        disabled={!productForm.category_id}
                      >
                        <option value="">-- Select --</option>
                        {subcategories
                          .filter(s => s.category_id === productForm.category_id)
                          .map(sub => (
                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                          ))}
                      </select>
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Price (₹) *">
                      <input
                        type="number"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                        className="w-full p-3 border rounded-lg"
                        required
                        min="0"
                        step="0.01"
                      />
                    </Field>

                    <Field label="Stock *">
                      <input
                        type="number"
                        value={productForm.stock}
                        onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                        className="w-full p-3 border rounded-lg"
                        required
                        min="0"
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Discount %">
                      <input
                        type="number"
                        value={productForm.discount_percentage}
                        onChange={(e) => setProductForm({ ...productForm, discount_percentage: Number(e.target.value) })}
                        className="w-full p-3 border rounded-lg"
                        min="0"
                        max="100"
                      />
                    </Field>

                    <Field label="Rating (0-5)">
                      <input
                        type="number"
                        value={productForm.rating}
                        onChange={(e) => setProductForm({ ...productForm, rating: Number(e.target.value) })}
                        className="w-full p-3 border rounded-lg"
                        step="0.1"
                        min="0"
                        max="5"
                      />
                    </Field>
                  </div>

                  <Field label="Brand / Author">
                    <input
                      type="text"
                      value={productForm.author}
                      onChange={(e) => setProductForm({ ...productForm, author: e.target.value })}
                      className="w-full p-3 border rounded-lg"
                      placeholder="e.g., Best Gifts"
                    />
                  </Field>

                  <Field label="Description">
                    <textarea
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full p-3 border rounded-lg"
                      rows={4}
                    />
                  </Field>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={productForm.is_new_arrival}
                        onChange={(e) => setProductForm({ ...productForm, is_new_arrival: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">New Arrival</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={productForm.is_top_selling}
                        onChange={(e) => setProductForm({ ...productForm, is_top_selling: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Top Selling</span>
                    </label>
                  </div>
                </div>

                {/* Right Column - Gallery */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold">Product Images (Max {MAX_GALLERY_IMAGES}) *</label>
                  
                  <label className="block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      className="hidden"
                      disabled={uploadingGallery}
                    />
                    <Upload className="mx-auto mb-2 text-gray-400" size={40} />
                    <p className="text-sm text-gray-600">
                      {uploadingGallery ? 'Uploading...' : 'Click to upload images'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {productForm.gallery?.length || 0}/{MAX_GALLERY_IMAGES} uploaded
                    </p>
                  </label>

                  {productForm.gallery && productForm.gallery.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {productForm.gallery.map((img, index) => (
                        <div key={index} className="relative group">
                          <img src={img} alt="" className="w-full h-32 object-cover rounded-lg border-2" />
                          
                          {productForm.src_url === img && (
                            <div className="absolute top-1 left-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded font-bold">
                              MAIN
                            </div>
                          )}
                          
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
                            <button 
                              type="button" 
                              onClick={() => setAsMainImage(img)} 
                              className="bg-white text-black px-3 py-1 rounded text-xs"
                            >
                              Set Main
                            </button>
                            <button 
                              type="button" 
                              onClick={() => removeGalleryImage(index)} 
                              className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <button 
                  type="button" 
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 px-4 py-3 border-2 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}
    </div>
  )
}

// ============================================
// 🎨 HELPER COMPONENTS
// ============================================

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-semibold mb-1">{label}</label>
    {children}
  </div>
)

const ModalOverlay = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
    <div onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
)

const ModalContent = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
  >
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    {children}
  </motion.div>
)