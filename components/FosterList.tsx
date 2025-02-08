"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

type FosterProvider = {
  id: number
  name: string
  gender: "男" | "女"
  hasExperience: boolean
  price: number
  avatar: string
  available: boolean
  rating: number
  location: string
  petTypes: string[]
}

const fosterProviders: FosterProvider[] = [
  {
    id: 1,
    name: "张三",
    gender: "男",
    hasExperience: true,
    price: 100,
    avatar: "/placeholder.svg?text=张三",
    available: true,
    rating: 4.5,
    location: "成华区",
    petTypes: ["dog", "cat"],
  },
  {
    id: 2,
    name: "李四",
    gender: "女",
    hasExperience: false,
    price: 80,
    avatar: "/placeholder.svg?text=李四",
    available: false,
    rating: 3.8,
    location: "锦江区",
    petTypes: ["dog"],
  },
  {
    id: 3,
    name: "王五",
    gender: "男",
    hasExperience: true,
    price: 120,
    avatar: "/placeholder.svg?text=王五",
    available: true,
    rating: 5,
    location: "武侯区",
    petTypes: ["cat", "other"],
  },
  {
    id: 4,
    name: "赵六",
    gender: "女",
    hasExperience: true,
    price: 90,
    avatar: "/placeholder.svg?text=赵六",
    available: true,
    rating: 4.2,
    location: "高新区",
    petTypes: ["dog", "cat", "other"],
  },
]

type FosterListProps = {
  location: string
  date: string
  petType: string
}

export default function FosterList({ location, date, petType }: FosterListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProviders = fosterProviders.filter(
    (provider) =>
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (location === "" || provider.location === location) &&
      (petType === "" || provider.petTypes.includes(petType)),
  )

  return (
    <div className="space-y-2">
      <Input
        type="text"
        placeholder="搜索服务商..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
      <div className="space-y-2">
        {filteredProviders.map((provider) => (
          <div key={provider.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-4">
              <Avatar className="w-8 h-8">
                <AvatarImage src={provider.avatar} alt={provider.name} />
                <AvatarFallback>{provider.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-semibold">{provider.name}</h3>
                <p className="text-xs text-gray-500">
                  {provider.gender} · {provider.hasExperience ? "有经验" : "无经验"} · {provider.location}
                </p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={i < Math.floor(provider.rating) ? "gold" : "none"}
                      stroke={i < Math.floor(provider.rating) ? "gold" : "gray"}
                    />
                  ))}
                  <span className="text-xs ml-1">{provider.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">¥{provider.price}</div>
              <div className={`text-xs ${provider.available ? "text-green-500" : "text-red-500"}`}>
                {provider.available ? "可预定" : "已预定"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

