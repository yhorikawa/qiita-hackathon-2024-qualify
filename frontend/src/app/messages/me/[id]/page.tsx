import { NavsTabLayout } from "#/app/_ui-components/NavsTabLayout";
import { MessageListNav } from "../../_dependencies/MessageListNav";
import { MyMessagesTabContent } from "../_dependencies/MyMessagesTabContent";

type PageProps = {
  params: { id: string };
};

export default function MessagesDetailPage({ params: { id } }: PageProps) {
  return (
    <NavsTabLayout
      tab={1}
      Navigation={<MessageListNav someoneMessageCount={0} />}
    >
      {/*  */}
    </NavsTabLayout>
  );
}
