import { GoogleGenerativeAI } from '@google/generative-ai'
import axios from 'axios'
import { generateObject } from 'ai';
import { z } from 'zod';
import { google } from '@ai-sdk/google';


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)
// const client=

export async function analyzeImage({imageUrl,food}:{imageUrl: string,food:string}): Promise<{
  foodName: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fact:string
} | null> {
  try {
    // const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    console.log('Fetching image from:', imageUrl)
    console.log('Fetching image from:', imageUrl);

    // Setting up Basic Auth for axios
    const basicAuth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

    // Fetch the image using axios
    const response = await axios.get(imageUrl, {
      headers: {
        Authorization: `Basic ${basicAuth}`,
      },
      responseType: 'arraybuffer', // Ensures data is returned as a text
    });
    
    
    // Fetch image and convert to base64
    const base64Image = Buffer.from(response.data).toString('base64')
    console.log(food)

    const prompt = `Analyze this food image and provide nutritional information in the following JSON format only:
    {
      "foodName": "name of the food",
      "calories": number in kcal,
      "protein": number in grams,
      "carbs": number in grams,
      "fat": number in grams,
      "amazing fact": "one amazing/ lesser known fact about the particular food"
    }
    Be specific with the food name and provide realistic nutritional values for the exact quantity shown in the image use plates or bowls in the image as reference if given.

    If the user provided a name or something, consider it as a hint: ${food}.
`

    // const result = await model.generateContent([
    //   prompt,
    //   {
    //     inlineData: {
    //       mimeType: 'image/jpeg',
    //       data: base64Image
    //     }
    //   }
    // ])
    const {object:nutrition}= await generateObject({
      model:google('gemini-1.5-pro'),
      system:"You are a calorie tracker & some a healthy nutritional food doctor",
      schema:z.object({
        foodName:z.string(),
        calories:z.number(),
        protein:z.number(),
        carbs:z.number(),
        fat:z.number(),
        fact:z.string()

      }),
      messages:[
        {
          role:'user',
          content:[
            {
              type:'image',
              image: `data:image/jpeg;base64,${base64Image}`, // Inline Base64 image data


            },
            {
              type:'text',
              text:prompt
            
            }

          ]
        }
      ]
      

    })


    // const responseText = result.response.text()
    //  // Clean the response to remove unwanted characters
    //  const jsonString = responseText
    //  .replace(/```json/g, '')  // Remove "```json" markers
    //  .replace(/```/g, '')      // Remove "```" markers
    //  .replace(/\\n/g, '')      // Remove any newline characters
    //  .trim();
    //                    // Trim whitespace
    //  console.log(responseText,jsonString)

      return nutrition;
   
    
  } catch (error) {
    console.error('Error analyzing image:', error)
    return null
  }
}