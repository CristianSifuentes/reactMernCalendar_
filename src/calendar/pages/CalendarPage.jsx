import { useState } from 'react';
// Big Calendar
// React Big Calendar
/// react big calendar is a powerful and customizable calendar component 
// for React applications. It provides a variety of views (month, week, day, agenda)
// and supports drag-and-drop functionality, event resizing, and more. 
// It is built on top of the popular date-fns library for date manipulation and formatting.
// It is widely used in applications that require scheduling and calendar functionalities.
// It is known for its flexibility and ease of integration with React applications.
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete} from '../';

import { localizer, getMessagesEN } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';



export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week' );

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    // console.log({ doubleClick: event });
    openDateModal();
  }

  const onSelect = ( event ) => {
    // console.log({ click: event });
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event );
    setLastView( event )
  }



  return (
    <>
      <Navbar />
      // Calendar Component from react-big-calendar
      // It displays a calendar interface where users can view and interact with events.
      // It supports various views (month, week, day) and allows for event selection and double-click actions.
      // It is highly customizable through props and integrates with the application's state management.
      <Calendar
        culture='enUS'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesEN() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />


      <CalendarModal />
      
      <FabAddNew />
      <FabDelete />


    </>
  )
}
