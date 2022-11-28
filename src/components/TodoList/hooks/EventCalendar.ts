export interface IEventCalendar {
    _id: string;
    id?: string;
    title: string;
    end: string;
    start: string;
    user: string;
}

export const mapEventCalendar = (eventCalendar: IEventCalendar) => ({
    ...eventCalendar,
    id: eventCalendar?.id,
});

export const mapArrayEventCalendar = (listEventsCalendar: IEventCalendar[]) => {
    const listEventsCalendarFormatted = listEventsCalendar.map((eventCalendar) => mapEventCalendar(eventCalendar));

    return listEventsCalendarFormatted;
};
