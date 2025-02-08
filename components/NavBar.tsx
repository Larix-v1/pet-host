'use client'

import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          <Image src="/logo-only.png" alt="宠托帮 Logo" width={40} height={40} />
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/foster" className="text-gray-600 hover:text-gray-900">
            关于我们
          </Link>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={session.user?.image || ""} />
                  <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/profile">个人资料</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/orders">我的订单</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/api/auth/signout">退出登录</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">
              登录/注册
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

