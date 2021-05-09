
import Home from 'containers/Home'
import { ContractProvider } from 'contexts/contract-context'

export default function HomePage() {
  return (
    <ContractProvider>
      <Home />
    </ContractProvider>
  )
}