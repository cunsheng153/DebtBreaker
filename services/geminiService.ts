
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// 生成文字鼓励
export const generateEncouragement = async (mood: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `作为一个温柔的债务咨询师和心理医生，给一个目前感到“${mood}”的正在努力还清债务的人写一句非常简短但充满力量的鼓励。不要超过30个字。`,
    });
    return response.text;
  } catch (error) {
    console.error("AI Generation failed:", error);
    return "每一步小小的努力，都是在为自由铺路。";
  }
};

// 语音合成播报
export const speakText = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `用温柔且坚定的语气朗读：${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // 使用清澈的男声/女声
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      await playRawAudio(base64Audio);
    }
  } catch (error) {
    console.error("TTS failed:", error);
  }
};

// PCM 音频解码播放逻辑
async function playRawAudio(base64Data: string) {
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  
  function decodeBase64(base64: string) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  const audioData = decodeBase64(base64Data);
  const dataInt16 = new Int16Array(audioData.buffer);
  const buffer = audioCtx.createBuffer(1, dataInt16.length, 24000);
  const channelData = buffer.getChannelData(0);
  
  for (let i = 0; i < dataInt16.length; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.start();
}
