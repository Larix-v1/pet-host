'use client'

import { useState, useRef, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [avatar, setAvatar] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [captcha, setCaptcha] = useState('')
  const [userCaptcha, setUserCaptcha] = useState('')

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // 生成验证码
  const generateCaptcha = useCallback(() => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let result = ''
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptcha(result)
  }, [])

  // 在组件加载时生成验证码
  useEffect(() => {
    generateCaptcha()
  }, [generateCaptcha])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userCaptcha.toLowerCase() !== captcha.toLowerCase()) {
      setError('验证码错误')
      return
    }
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const identifier = formData.get('identifier') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier,
          password,
          avatar,
        }),
      })

      if (response.ok) {
        router.push('/auth/login')
      } else {
        const data = await response.json()
        setError(data.error)
      }
    } catch (error) {
      setError('注册过程中出现错误')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="container mx-auto p-4 max-w-sm">
        <Button 
          variant="backButton" 
          size="sm" 
          onClick={() => router.back()} 
          className="mb-4 text-2xl"
        >
          &lt;
        </Button>
        <h1 className="text-2xl font-bold mb-4 text-center">用户注册</h1>
      </div>

      <div className="p-4">
        <div className="max-w-[400px] mx-auto">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center mb-6">
              <div
                onClick={handleAvatarClick}
                className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400"
              >
                {avatar ? (
                  <Image
                    src={avatar}
                    alt="Avatar"
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-500">点击上传头像</span>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-2">支持 jpg、png 格式，大小不超过 2MB</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">账号</label>
              <Input
                type="text"
                name="identifier"
                placeholder="请输入手机号码或邮箱"
                required
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">密码</label>
              <Input
                type="password"
                name="password"
                required
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">确认密码</label>
              <Input
                type="password"
                name="confirmPassword"
                required
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">验证码</label>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)}
                  placeholder="请输入验证码"
                  required
                  className="flex-1"
                />
                <div 
                  className="w-24 h-10 flex items-center justify-center bg-gray-100 text-gray-700 font-mono text-lg cursor-pointer"
                  onClick={generateCaptcha}
                >
                  {captcha}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? '注册中...' : '注册'}
            </Button>
          </form>
          <p className="text-center mt-4">
            已有账号？ <Link href="/auth/login" className="text-blue-500">登录</Link>
          </p>
        </div>
      </div>
    </div>
  )
} 