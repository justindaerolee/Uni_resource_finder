import SearchBooks from './components/SearchBooks.vue';
import HomePage from './components/HomePage.vue';
import SearchCourses from './components/SearchCourse.vue';
import GoogleMaps from './components/GoogleMaps.vue';
import SearchSubject from './components/SearchSubject.vue';

export default [
  { path: '/', component:HomePage },
  { path: '/keywordsearch', component:SearchBooks },
  { path: '/coursesearch', component:SearchCourses },
  { path: '/googlemaps', component:GoogleMaps },
  { path: '/subject', component:SearchSubject },
]
