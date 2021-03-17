import NextLink from 'next/link';
import {
  TabContainer,
  TabContent,
  TabsContainer,
} from '../styles/components/Tabs';

export interface TabProps {
  active?: boolean;
  text: string;
  url?: string;
}

interface TabsProps {
  tabs: TabProps[];
}

function Tab({ active = false, text, url }: TabProps): JSX.Element {
  return (
    <>
      {url && (
        <NextLink href={url}>
          <TabContainer active={active}>
            <TabContent>
              <h5>{text.toUpperCase()}</h5>
            </TabContent>
          </TabContainer>
        </NextLink>
      )}

      {!url && (
        <TabContainer active={active}>
          <TabContent>
            <h5>{text.toUpperCase()}</h5>
          </TabContent>
        </TabContainer>
      )}
    </>
  );
}

export default function Tabs({ tabs }: TabsProps): JSX.Element {
  return (
    <TabsContainer>
      {tabs.map(tab => (
        <Tab key={tab.text} active={tab.active} text={tab.text} url={tab.url} />
      ))}
    </TabsContainer>
  );
}
