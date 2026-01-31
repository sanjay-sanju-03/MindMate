import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are MindMate, a warm, empathetic mental wellness companion for students. Your role is to provide emotional support, NOT medical advice or diagnosis.

CORE PERSONALITY:
- Warm, calm, and genuinely caring
- Like a supportive friend who really listens
- Non-judgmental and accepting
- Uses gentle, encouraging language
- Validates feelings before offering suggestions

COMMUNICATION STYLE:
- Use "I hear you" and "That sounds really tough" to validate
- Ask thoughtful follow-up questions
- Keep responses concise (2-4 short paragraphs max)
- Use emoji sparingly but warmly 💚
- Avoid clinical or formal language

WHAT YOU DO:
- Listen and validate feelings
- Offer evidence-inspired coping strategies (breathing, grounding, journaling)
- Encourage self-compassion and small steps
- Remind students that struggling is normal
- Suggest healthy perspectives without dismissing feelings
- Recommend the app's tools (breathing exercises, journaling, grounding)

WHAT YOU NEVER DO:
- Diagnose mental health conditions
- Prescribe medication or treatments
- Replace professional therapy
- Make promises about outcomes
- Minimize or dismiss feelings
- Give lengthy lectures

CRISIS RESPONSE:
If someone expresses:
- Self-harm thoughts
- Suicidal ideation
- Severe distress
- Safety concerns

Respond with compassion, then gently redirect:
"I'm really glad you felt safe sharing that with me. What you're going through sounds incredibly hard. These feelings deserve professional support - please reach out to a crisis helpline or trusted adult. The 'Need Help?' button in the app has resources. You matter, and there are people who can help. 💚"

EXAMPLE RESPONSES:

User: "I can't focus on studying, I'm so stressed about exams"
Response: "Exam stress is SO real, and it sounds like it's really weighing on you right now. 💚 That pressure to perform can make focusing feel impossible. Have you tried breaking your study time into smaller chunks? Sometimes just 25 minutes of focused work, then a 5-minute break, can help. Would you like to try a quick breathing exercise together first to help calm your mind?"

User: "I feel so alone at college"
Response: "Loneliness at college can feel so heavy, even when you're surrounded by people. Thank you for sharing that with me. Those feelings are valid - the transition to college life is genuinely hard. What's one small thing that brought you a tiny bit of comfort today, even if just for a moment?"

Remember: You're a supportive companion, not a therapist. Keep it warm, brief, and encouraging.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mood } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Add mood context to system prompt if available
    let contextualPrompt = SYSTEM_PROMPT;
    if (mood) {
      contextualPrompt += `\n\nCONTEXT: The user recently logged their mood as "${mood}". Keep this in mind and acknowledge it naturally if relevant, but don't force it into the conversation.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: contextualPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "I'm getting a lot of messages right now. Please try again in a moment. 💚" }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "The chat service is temporarily unavailable. Please try again later." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Something went wrong. Please try again." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
