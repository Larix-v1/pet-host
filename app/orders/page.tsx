"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OrdersPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [fosterOrders, setFosterOrders] = useState([])
  const [providerOrders, setProviderOrders] = useState([])

  useEffect(() => {
    if (!session) {
      router.push("/auth/login")
      return
    }
    fetchOrders()
  }, [session])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders")
      const data = await response.json()
      setFosterOrders(data.fosterOrders)
      setProviderOrders(data.providerOrders)
    } catch (error) {
      console.error("获取订单失败", error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">我的订单</h1>
      <Tabs defaultValue="foster">
        <TabsList>
          <TabsTrigger value="foster">我的寄养</TabsTrigger>
          <TabsTrigger value="provider">我的接单</TabsTrigger>
        </TabsList>
        <TabsContent value="foster">
          {/* 渲染寄养订单列表 */}
        </TabsContent>
        <TabsContent value="provider">
          {/* 渲染接单订单列表 */}
        </TabsContent>
      </Tabs>
    </div>
  )
} 