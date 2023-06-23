/** @jsxImportSource ai-jsx */
import { toStreamResponse } from 'ai-jsx/stream'
import { ChatCompletion, ConversationHistory, SystemMessage, UserMessage } from 'ai-jsx/core/completion'
import { Prompt } from 'ai-jsx/batteries/prompts';

function Translate({ children, language }: { children: string, language: string }) {
  return <ChatCompletion temperature={1}>
    <SystemMessage>
      <Prompt hhh persona='expert translator' />
      Translate any messages you receive to {language}. Respond only with the translation.
    </SystemMessage>
    <UserMessage>{children}</UserMessage>
  </ChatCompletion>
}

function MultiTranslate({ children, languages }: { children: string, languages: string[] }) {
  return languages.map(language => <>
    * {language}: <Translate language={language}>{children}</Translate>{'\n'}
  </>)
}

function RhymingConversationalist({messages}: {messages: any}) {
  return <ChatCompletion temperature={1}>
    <SystemMessage>Always respond with rhymes.</SystemMessage>
    <ConversationHistory messages={messages} />
  </ChatCompletion>
}

function LanguageCoach({children}: {children: string}) {
  return <>
    * English translation: <Translate language='english'>{children}</Translate>
    {'\n'}
    * Feedback: <ChatCompletion>
      <SystemMessage>
        <Prompt hhh persona='expert translator' concise />
        The user is an English speaker learning a new language. They will give you a message in the new language; give them feedback (in English) on how fluent it sounds.
      </SystemMessage>
      <UserMessage>{children}</UserMessage>
    </ChatCompletion>
  </>
}

export const runtime = 'edge'
export async function POST(req: Request) {
  const { messages } = await req.json();
  const mostRecentMessage = messages[messages.length - 1].content;
  return toStreamResponse(
    <>
      {/* <RhymingConversationalist messages={messages}/> */}

      {/* <MultiTranslate languages={['French', 'Polish', 'Spanish']}>{mostRecentMessage}</MultiTranslate> */}

      <LanguageCoach>{mostRecentMessage}</LanguageCoach>
    </>
  );
}
