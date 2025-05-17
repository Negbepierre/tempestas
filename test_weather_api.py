import requests

def get_fashion_advice(temp, condition):
    condition = condition.lower()
    
    if temp < 0:
        advice = "🧥 Thermal layers, heavy winter coat, gloves, scarf, Chelsea boots"
    elif 0 <= temp < 10:
        advice = "🧣 Hoodie or sweater, trench coat, jeans, and Chelsea boots"
    elif 10 <= temp < 20:
        advice = "🧥 Light jacket or hoodie, long sleeves, and trousers"
    elif 20 <= temp < 30:
        advice = "👕 T-shirt, light trousers or skirt, sneakers"
    else:
        advice = "🩳 Tank top, shorts, sandals, and sunglasses 😎"

    # Add condition-based modifiers
    if "rain" in condition:
        advice += "\n☔ It might rain—carry an umbrella and wear a waterproof trench coat or jacket."
    elif "snow" in condition:
        advice += "\n❄️ Snowy outside—opt for waterproof boots and thermal accessories."

    return advice

API_KEY = '75619b64ee40bdd4ce3d565c250426eb'
city = input("Enter city name: ")

url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric'
response = requests.get(url)
data = response.json()

if response.status_code == 200:
    temp = data['main']['temp']
    condition = data['weather'][0]['description']

    print(f"\nWeather in {data['name']}:")
    print(f"🌡️ Temperature: {temp}°C")
    print(f"🌤️ Condition: {condition.capitalize()}")
    
    fashion_tip = get_fashion_advice(temp, condition)
    print(f"\n👗 Fashion Advice:\n{fashion_tip}")
else:
    print("\n❌ Failed to fetch weather data.")
    print("Reason:", data.get("message", "Unknown error"))
