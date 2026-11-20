import LinkButtonRow, { type LinkChannel } from "./LinkButtonRow";

// Kept as a named re-export so the catering page's CONTACT_CHANNELS typing
// doesn't have to change.
export type ContactChannel = LinkChannel;

interface ContactButtonsProps {
  channels: ContactChannel[];
  className?: string;
}

export default function ContactButtons({
  channels,
  className = "",
}: ContactButtonsProps) {
  return <LinkButtonRow channels={channels} className={className} />;
}
