'use client'
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { IoPersonOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineHomeWork } from "react-icons/md";
import { TbHomePlus } from "react-icons/tb";
import { MdBalance } from "react-icons/md";
import { IoIosTrendingUp } from "react-icons/io";

const sidebarGroupArr = [
  {
    title: "Profile",
    list: [
    {
      title: "My Profile",
      url: "#",
      icon: <IoPersonOutline size={23}/>
    },
    {
      title: "Edit Profile",
      url: "#",
      icon: <CiEdit size={23}/>
    },
    {
      title: "Logout",
      url: "#",
      icon: <IoMdLogOut size={23}/>
    },
  ]
},
{
  title: "Property Management", 
  list: [
    {
      title: "Property List",
      url: "#",
      icon: <MdOutlineHomeWork size={23}/>
    },
    {
      title: "Add Property",
      url: "#",
      icon: <TbHomePlus size={23}/>
    }
  ]
  },
  {
    title: "Transactions", 
    list: [
    {
      title: "Balance",
      url: "#",
      icon: <MdBalance size={23}/>
    },
    {
      title: "Statistic",
      url: "#",
      icon: <IoIosTrendingUp size={23}/>
    }
  ]
  }
]
 
export default function TenantSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-slate-200">
        {
          sidebarGroupArr.map((item, index) => {
            return(
            <SidebarGroup key={index}>
              <SidebarGroupLabel className="rounded-full font-bold text-blue-600 text-lg px-3 py-6">{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.list.map((itm, idx) => (
                    <SidebarMenuItem className="text-base font-light text-black" key={idx}>
                      <SidebarMenuButton asChild>
                        <Link href={itm.url} className="px-3 flex items-center gap-5">
                          {itm.icon}
                          <span>{itm.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            )
          })
        }
      </SidebarContent>
    </Sidebar>
  )
}
