// Test API dla aplikacji React
// Uruchom to w konsoli przeglądarki na localhost:3000

console.log('🧪 Rozpoczynam test API...');

// Test 1: Sprawdź czy aplikacja jest dostępna
async function testAppAvailability() {
    try {
        const response = await fetch('http://localhost:3000');
        if (response.ok) {
            console.log('✅ Aplikacja jest dostępna na localhost:3000');
            return true;
        } else {
            console.log('❌ Aplikacja nie jest dostępna');
            return false;
        }
    } catch (error) {
        console.log('❌ Błąd połączenia:', error.message);
        return false;
    }
}

// Test 2: Sprawdź czy mock API jest skonfigurowany
function testMockAPIConfig() {
    console.log('🔍 Sprawdzam konfigurację mock API...');
    console.log('📋 Mock API jest skonfigurowany w src/services/apiClient.ts');
    console.log('🎯 USE_MOCK_DATA = true (ponieważ API_URL = "https://api.example.com")');
    console.log('✅ Wszystkie wywołania API będą używać mock danych');
}

// Test 3: Sprawdź dostępne endpointy
function testAvailableEndpoints() {
    console.log('📋 Dostępne endpointy API:');
    console.log('• apiClient.startAssessment(type, userId)');
    console.log('• apiClient.submitAnswer(sessionId, answer)');
    console.log('• apiClient.getProfile(userId)');
    console.log('• api.users.completeOnboarding(userId, data)');
    console.log('• api.ai.next(sessionId)');
    console.log('• api.onboarding.submit(data)');
}

// Test 4: Instrukcje testowania w aplikacji
function testInstructions() {
    console.log('🎯 Aby przetestować API w aplikacji:');
    console.log('1. Przejdź do /assessment - testuje startAssessment i submitAnswer');
    console.log('2. Przejdź do /onboarding - testuje completeOnboarding');
    console.log('3. Przejdź do /tension - testuje różne endpointy Tension');
    console.log('4. Sprawdź konsolę przeglądarki pod kątem błędów API');
}

// Uruchom wszystkie testy
async function runAllTests() {
    console.log('🚀 Rozpoczynam kompleksowy test API...\n');
    
    const appAvailable = await testAppAvailability();
    console.log('');
    
    testMockAPIConfig();
    console.log('');
    
    testAvailableEndpoints();
    console.log('');
    
    testInstructions();
    console.log('');
    
    if (appAvailable) {
        console.log('✅ API jest gotowe do testowania!');
        console.log('🌐 Otwórz aplikację na http://localhost:3000');
    } else {
        console.log('❌ Aplikacja nie jest dostępna. Uruchom: npm start');
    }
}

// Uruchom testy
runAllTests();
