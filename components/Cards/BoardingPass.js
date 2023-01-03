import { Divider } from "@mui/material";

const BoardingPass = ({ ticket }) => {
  const formatIDR = new Intl.NumberFormat("ID", {
    style: "currency",
    currency: "IDR",
  });

  const styles = {
    title: "",
    subTitle: "text-xl font-semibold text-gray-500",
    textBig: "text-xl",
  };

  const generateDate = (date) => {
    const d = new Date(date).toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return d;
  };

  const departurePass = ticket.boardingPasses.boarding_pass_pergi;
  const returningPass = ticket.boardingPasses.boarding_pass_pulang || null;


  return (
    <div>
      <div className="bg-primaryBlue mb-8 rounded-[1.2rem]">
        {/* title */}
        <div className="flex w-full px-6 py-4 items-center justify-center uppercase">
          <span className="text-2xl font-semibold text-white" id="page-title">
            Purchase Success!
          </span>
        </div>
        <div className="w-full flex flex-col bg-white rounded-lg shadow-lg p-8 items-center mb-8">
          {/* invoice */}
          <div className="w-full flex flex-col my-3" id="ticket details">
            <span className="text-base font-semibold text-gray-500">Invoice</span>
            <Divider />

            <div className="py-3">
              {/* passenger name */}
              <div className="w-full flex flex-col justify-center my-2" id="ticket-passanger-name">
                <span className="text-sm font-normal text-gray-500">Passenger</span>
                <span className="text-sm font-semibold text-gray-700">{ticket.username}</span>
              </div>
              <div className="w-full flex flex-col justify-center my-2" id="ticket-passanger-name">
                <span className="text-sm font-normal text-gray-500">Invoice Number</span>
                <span className="text-sm font-semibold text-gray-700">{ticket.invoiceNumber}</span>
              </div>
            </div>

            <span className="text-base font-semibold text-gray-500">Ticket Information</span>
            <Divider />
            <div className="py-3">
              <div className="w-full flex my-2" id="ticket-flight-type">
                <span className="text-sm w-4/12 font-normal text-gray-500">Flight Type</span>
                <span className="text-sm font-semibold text-gray-700">: {ticket.flightType}</span>
              </div>
              <div className="w-full flex my-2" id="ticket-flight-type">
                <span className="text-sm w-4/12 font-normal text-gray-500">Total Price</span>
                <span className="text-sm font-semibold text-gray-700">
                  : {formatIDR.format(ticket.totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* boarding pass Pergi */}
      <div className="bg-primaryBlue mb-8 rounded-[1.2rem]">
        {/* title */}
        <div className="flex w-full px-8 py-4 items-baseline justify-between uppercase">
          <div className="flex">
            <span className="text-base font-semibold text-white " id="page-title">
              {departurePass.flight.flight_class} class
            </span>
            <div className="mx-5 text-base font-light text-white">|</div>
            <span className="text-base font-semibold text-white " id="page-title">
              Boarding Pass
            </span>
          </div>
          <div>
            <span className="text-base font-semibold text-white">
              {departurePass.flight.airplane.manufacture}{" "}
              {departurePass.flight.airplane.model_number}
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col bg-white rounded-lg shadow-lg px-8 py-6 items-center">
          {/* Info */}
          <div className="w-full flex flex-col" id="ticket details">
            <div className="">
              <span className="text-base font-semibold text-gray-500">Flight Information</span>
              <Divider />

              {/* passenger name */}
              <div className="w-full flex my-2">
                <span className="text-sm w-4/12 font-normal text-gray-500">passenger</span>
                <span className="text-sm font-semibold text-gray-700">: {ticket.username}</span>
              </div>

              {/* from */}
              <div className="w-full flex my-2">
                <span className="text-sm w-4/12 font-normal text-gray-500">Departure Airport</span>
                <span className="text-sm font-semibold text-gray-700">
                  : {departurePass.flight.from_airport.name}
                </span>
              </div>

              {/* to */}
              <div className="w-full flex my-2">
                <span className="text-sm w-4/12 font-normal text-gray-500">Arrival Airport</span>
                <span className="text-sm font-semibold text-gray-700">
                  : {departurePass.flight.to_airport.name}
                </span>
              </div>

              {/* departure date */}
              <div className="w-full flex my-2">
                <span className="text-sm w-4/12 font-normal text-gray-500">Boarding Time</span>
                <span className="text-sm font-semibold text-gray-700">
                  : {generateDate(departurePass.flight.departure)}
                </span>
              </div>

              {/* Seat */}
              <div className="w-full flex my-2">
                <span className="text-sm w-4/12 font-normal text-gray-500">Seat</span>
                <span className="text-sm font-semibold text-gray-700">: {departurePass.seat}</span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col" id="ticket details">
            <div className="py-2">
              <span className="text-base font-semibold text-gray-500">Notes</span>
              <Divider />
              <div className="flex justify-between pt-4">
                <span className="text-sm font-normal text-gray-500 uppercase">
                  Time and gate are subject to change. please be at the gate 30 minutes before
                  boarding time.
                </span>
                <img src="/img/barcode.png" alt="barcode" className="w-[20%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* boarding pass pulang */}
      {returningPass && (
        <div className="bg-primaryBlue mb-8 rounded-[1.2rem]">
          {/* title */}
          <div className="flex w-full px-8 py-4 items-baseline justify-between uppercase">
            <div className="flex">
              <span className="text-base font-semibold text-white " id="page-title">
                {returningPass.flight.flight_class} class
              </span>
              <div className="mx-5 text-base font-light text-white">|</div>
              <span className="text-base font-semibold text-white " id="page-title">
                Boarding Pass
              </span>
            </div>
            <div>
              <span className="text-base font-semibold text-white">
                {returningPass.flight.airplane.manufacture}{" "}
                {returningPass.flight.airplane.model_number}
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col bg-white rounded-lg shadow-lg px-8 py-6 items-center">
            {/* Info */}
            <div className="w-full flex flex-col" id="ticket details">
              <div className="">
                <span className="text-base font-semibold text-gray-500">Flight Information</span>
                <Divider />

                {/* passenger name */}
                <div className="w-full flex my-2">
                  <span className="text-sm w-4/12 font-normal text-gray-500">passenger</span>
                  <span className="text-sm font-semibold text-gray-700">: {ticket.username}</span>
                </div>

                {/* from */}
                <div className="w-full flex my-2">
                  <span className="text-sm w-4/12 font-normal text-gray-500">
                    Departure Airport
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    : {returningPass.flight.from_airport.name}
                  </span>
                </div>

                {/* to */}
                <div className="w-full flex my-2">
                  <span className="text-sm w-4/12 font-normal text-gray-500">Arrival Airport</span>
                  <span className="text-sm font-semibold text-gray-700">
                    : {returningPass.flight.to_airport.name}
                  </span>
                </div>

                {/* departure date */}
                <div className="w-full flex my-2">
                  <span className="text-sm w-4/12 font-normal text-gray-500">Boarding Time</span>
                  <span className="text-sm font-semibold text-gray-700">
                    : {generateDate(returningPass.flight.departure)}
                  </span>
                </div>

                {/* Seat */}
                <div className="w-full flex my-2">
                  <span className="text-sm w-4/12 font-normal text-gray-500">Seat</span>
                  <span className="text-sm font-semibold text-gray-700">
                    : {returningPass.seat}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col" id="ticket details">
              <div className="py-2">
                <span className="text-base font-semibold text-gray-500">Notes</span>
                <Divider />
                <div className="flex justify-between pt-4">
                  <span className="text-sm font-normal text-gray-500 uppercase">
                    Time and gate are subject to change. please be at the gate 30 minutes before
                    boarding time.
                  </span>
                  <img src="/img/barcode.png" alt="barcode" className="w-[20%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardingPass;
