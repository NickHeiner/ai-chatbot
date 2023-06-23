/** @jsxImportSource ai-jsx */
import { toStreamResponse } from 'ai-jsx/stream'
import { ChatCompletion, ConversationHistory, SystemMessage } from 'ai-jsx/core/completion'

export const runtime = 'edge'
export async function POST(req: Request) {
  const { messages } = await req.json();
  return toStreamResponse(
    <>
      <ChatCompletion temperature={1}>
        <SystemMessage>Always respond with rhymes.</SystemMessage>
        <ConversationHistory messages={messages} />
      </ChatCompletion>
    </>
  );
}
