import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import { MessageCircleCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import WorkspaceHistory from "./WorkspaceHistory"
import SideBarFooter from "./SideBarFooter"


   
const AppSideBar = () => {
  return (
    <Sidebar>
      <SidebarHeader className='p-5'>
    <div className="logo font-bold text-2xl text-white">
      CursorCloud
    </div>
    <Button className='mt-5'> <MessageCircleCode/>Start New Chat</Button>
    </ SidebarHeader >
    <SidebarContent className='p-5'>
      
      <SidebarGroup>
        <WorkspaceHistory/>
        </SidebarGroup>
      {/* <SidebarGroup /> */}
    </SidebarContent>
    <SidebarFooter>
      <SideBarFooter/>

    </SidebarFooter>
  </Sidebar>
  )
}

export default AppSideBar
