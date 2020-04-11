import {Button, NavigationView, Page, contentView} from 'tabris';
import {NewsPage} from './pages/NewsPage';

// Create a full-size navigation view and add a page to it
contentView.append(
  <NavigationView stretch>
    <Page title='Main Page'>
      <Button center onSelect={() => openNewsPage()}>
        Open news page
      </Button>
    </Page>
  </NavigationView>
)

function openNewsPage() {
  $(NavigationView).only().append(
    <NewsPage />
  );
}