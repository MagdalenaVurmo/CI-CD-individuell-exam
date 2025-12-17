import { http, HttpResponse } from "msw";

const API_URL =
  "https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com/booking";
  

export const handlers = [
  http.post(API_URL, async ({ request }) => {
    const body = await request.json();

    const price = body.people * 120 + body.lanes * 100;

    return HttpResponse.json({
      bookingDetails: {
        when: body.when,
        lanes: body.lanes,
        people: body.people,
        shoes: body.shoes,
        price: price,
        bookingId: "STR1234ABC",
        active: true,
      },
    });
  }),
];