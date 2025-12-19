import DynamicForm from "./components/DynamicForm"
import { formConfig } from "./config/formConfig"

function App() {


  return (
    <>
      <DynamicForm config={formConfig} />
    </>
  )
}

export default App
