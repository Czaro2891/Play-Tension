import { prisma } from './lib/prisma'

async function testConnection() {
  try {
    // Test połączenia
    await prisma.$connect()
    console.log('✅ Połączenie z bazą danych działa!')
    
    // Opcjonalnie: dodaj testowego użytkownika
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User'
      }
    })
    
    console.log('✅ Utworzono użytkownika:', user)
    
  } catch (error) {
    console.error('❌ Błąd:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
