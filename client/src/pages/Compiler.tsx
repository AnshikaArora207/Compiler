import CodeEditor from "@/components/CodeEditor"
import HelperHeader from "@/components/HelperHeader"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
const Compile = () => {
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
          <span className="font-semibold">Right Side</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>

  )
}

export default Compile