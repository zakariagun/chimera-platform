import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-primary mb-6">
          Chimera Platform
        </h1>
        <p className="text-gray-600 mb-6">
          منصة ثورية عربية لتوليد التلقينات الاحترافية للذكاء الاصطناعي
        </p>
        <div className="mb-6">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            النقرات: {count}
          </button>
        </div>
        <div className="space-y-2 text-sm text-gray-500">
          <p>✅ React + TypeScript + Vite مُعد بنجاح</p>
          <p>✅ Tailwind CSS مكون ويعمل</p>
          <p>✅ البيئة جاهزة للتطوير</p>
        </div>
      </div>
    </div>
  )
}

export default App