import Header from './components/Header'
import Sidebar from './components/Sidebar'
import AdministratorTable from './components/AdministratorTable'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-pc-bg flex flex-col">
      <Header />
      
      <div className="bg-white mx-6 mt-6 rounded-lg shadow-sm border border-gray-200 flex-1 mb-12">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-light text-gray-900">People</h1>
        </div>
        
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 px-6 py-5 bg-white">
            <AdministratorTable />
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default App