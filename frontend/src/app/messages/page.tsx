import { NavsTabLayout } from "#/app/_ui-components/NavsTabLayout";
import { MessageListNav } from "./_dependencies/MessageListNav";
import { MyMessagesTabContent } from "./_dependencies/MyMessagesTabContent";

export default function MessagesPage() {
  return (
    <NavsTabLayout Navigation={<MessageListNav someoneMessageCount={0} />}>
      <MyMessagesTabContent />
    </NavsTabLayout>
  );
}
