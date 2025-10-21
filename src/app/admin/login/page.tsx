'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import toast, { Toaster } from 'react-hot-toast'

export default function AdminLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/admin'
  const err = searchParams.get('err')
  const supabase = createClientComponentClient()

  const [userid, setUserid] = useState('') // email as userid
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (err === 'forbidden') toast.error('Not authorized as admin')
  }, [err])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: userid,
        password
      })
      if (error) throw error

      // client-side whitelist check (extra safety)
      const allowed = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
        .split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
      if (allowed.length && !allowed.includes(userid.toLowerCase())) {
        await supabase.auth.signOut()
        toast.error('This user is not an admin')
        return
      }

      toast.success('Logged in!')
      router.replace(redirectTo)
    } catch (e: any) {
      toast.error(e.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">User ID (Email)</label>
            <input
              type="email"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              placeholder="admin@gmail.com"
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-black"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-lg py-3 font-semibold hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
          <p className="text-center text-xs text-gray-500 mt-2">
            Add admin emails in NEXT_PUBLIC_ADMIN_EMAILS
          </p>
        </form>
      </div>
    </div>
  )
}