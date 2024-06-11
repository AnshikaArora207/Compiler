// import { RootState } from "@/Redux/store"
import CodeEditor from "@/components/CodeEditor"
import HelperHeader from "@/components/HelperHeader"
import RenderCode from "@/components/RenderCode"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
// import { useSelector } from "react-redux"
const Compile = () => {
  // const html = useSelector((state: RootState)=>state.compilerSlice.html)
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className=""
    >
      <ResizablePanel defaultSize={50}>
        <div className="h-[calc(100dvh-60px)] min-w-[350px]">
          <HelperHeader/>
          <CodeEditor/>
        </div>
      </ResizablePanel>
      
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="h-[calc(100dvh-60px)] min-w-[350px]">
          <RenderCode/>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>

  )
}

export default Compile