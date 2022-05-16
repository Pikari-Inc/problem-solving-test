import { useRouter } from 'next/router'
import Image from 'next/image'
import { formatCADCurrency } from '../../utils/currency'
import useSWR from 'swr'
import FullPageLoader from '@components/Invoice/FullPageLoader'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Invoice() {
  /************************************ TODOS ************************************
   *
   * 1. Add Qty so Price Per Person make sense when looking at total?
   *
   ******************************************************************************/

  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(`/api/transactions/invoices/getInvoiceById/${id}`, fetcher)

  // TEMPORARY
  if (error) return <div>Failed to Load</div>
  if (!data) return <FullPageLoader />

  const invoice = data.invoice
  const packages = data.packages

  // get table row for package (line item)
  const getPackageDetails = () => {
    if (Array.isArray(packages) && packages.length > 1) {
      return packages.map((item, index) => (
        <tr key={index}>
          <td>{item.fields['Package ID']}</td>
          <td>{item.fields.Hotel[0]}</td>
          <td>{item.fields['Room Type'][0]}</td>
          <td>{item.fields['Number of Nights'][0]}</td>
          <td>{item.fields.Occupancy}</td>
          {/* FIX THIS - should be Rate field from Line Item*/}
          <td className="text-right">{formatCADCurrency(item.fields['Per Person Package Price'])}</td>
        </tr>
      ))
    } else {
      return (
        <tr>
          <td>{packages.fields['Package ID']}</td>
          <td>{packages.fields.Hotel[0]}</td>
          <td>{packages.fields['Room Type'][0]}</td>
          <td>{packages.fields['Number of Nights'][0]}</td>
          <td>{packages.fields.Occupancy}</td>
          {/* FIX THIS - should be Rate field from Line Item*/}
          <td className="text-right">{formatCADCurrency(packages.fields['Per Person Package Price'])}</td>
        </tr>
      )
    }
  }

  // get room descriptions
  const getRoomDescriptions = () => {
    if (Array.isArray(packages) && packages.length > 1) {
      return packages.map((item, index) => <p key={index}>{item.fields['Room Description']}</p>)
    } else {
      return <p>{packages.fields['Room Description']}</p>
    }
  }

  return (
    <div className="leading-tight">
      <div id="header" className="flex justify-between ml-4 mr-12 mt-12 mb-2">
        <Image alt="wpyj logo" src="/images/wpyj-logo.png" width={200} height={200} />
        <div className="text-right">
          <div className="mb-4">
            <h1 className="text-5xl">INVOICE</h1>
            <p className="text-gray-500">Trinidad Carvival 2023</p>
          </div>
          <div className="mb-6">
            <p className="font-bold text-xl">We Plan You Jam</p>
            <p>170 Western Main Road</p>
            <p>Port-of-Spain, Trinidad</p>
          </div>
          <div>
            <p>weplanyoujam.com</p>
          </div>
        </div>
      </div>
      <hr />
      <div id="body">
        <div id="billing-details" className="flex justify-between my-6 mx-12">
          <div>
            <div className="text-gray-500 text-xl">BILL TO</div>
            <div>
              <p className="font-bold">{user.name}</p>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="">
            <table className="font-bold w-auto">
              <tbody>
                <tr>
                  <td className="text-right pr-2">Invoice ID:</td>
                  <td className="font-normal w-px">{invoice.id}</td>
                </tr>
                <tr>
                  <td className="text-right pr-2">Invoice Date:</td>
                  <td className="font-normal w-px">{invoice.fields['Invoice Date']}</td>
                </tr>
                <tr>
                  <td className="text-right pr-2 pb-3">Payment Due:</td>
                  <td className="font-normal w-px pb-3">{invoice.fields['Due Date']}</td>
                </tr>
                <tr className="font-bold text-xl h-2 bg-pink-600 text-white">
                  <td className="text-right p-2 pl-4">AMOUNT DUE (USD):</td>
                  {/* FIX THIS - NaN */}
                  <td>{formatCADCurrency(invoice.fields['Payment Amount'])}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div id="invoice-breakdown" className="mx-12 my-8">
          <table className="w-full text-left">
            <thead>
              <tr className="border-solid my-3 border-slate-400 border-b-2 h-10">
                <th>Package ID</th>
                <th>Hotel</th>
                <th>Room Type</th>
                <th>Nights</th>
                <th>Occupancy</th>
                <th className="text-right">Price Per Person</th>
              </tr>
            </thead>
            <tbody>{getPackageDetails()}</tbody>
          </table>
        </div>
        <div id="room-description" className="mx-12 my-8">
          <div className="font-bold">Room Description (per hotel website)</div>
          {getRoomDescriptions()}
        </div>
        <div className="border-solid bg-neutral-300 border-b-2 mx-12"></div>
        <div id="invoice-total" className="mx-12 my-2 flex justify-end">
          <div>
            <table style={{ marginLeft: '8.25rem' }}>
              <tbody className="text-lg leading-8">
                <tr>
                  <td className="font-bold text-right pr-4">Total:</td>
                  <td>{formatCADCurrency(invoice.fields['Invoice Amount'])}</td>
                </tr>
                <tr>
                  <td className="text-right pr-4">25% Deposit:</td>
                  <td>{formatCADCurrency(invoice.fields['Invoice Amount'] * 0.25)}</td>
                </tr>
                <tr>
                  <td className="text-right pr-4">Adjustment:</td>
                  <td>What dis?</td>
                </tr>
              </tbody>
            </table>
            <div className="border-solid bg-neutral-300 border-b-2"></div>
            <table className="ml-6">
              <tbody className="text-lg leading-8">
                <tr className="font-bold">
                  <td className="text-right text-xl pr-4">Amount Due (USD):</td>
                  <td className="text-xl">
                    {formatCADCurrency(invoice.fields['Invoice Amount'] - invoice.fields['Invoice Amount'] * 0.25)}
                  </td>
                </tr>
                <tr>
                  <td className="text-right pr-4">Monthly Payment Amount: </td>
                  <td>I dunno</td>
                </tr>
                <tr>
                  <td className="text-right pr-4">No. of Monthly Payments:</td>
                  <td>How about 5?</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id="footer" className="mt-4">
        <div className="text-center text-2xl h-9 bg-neutral-100">
          Click{' '}
          <a
            href="https://weplanyoujam.com/terms"
            rel="noreferrer"
            target="_blank"
            className="text-cyan-700 font-medium hover:underline"
          >
            here
          </a>{' '}
          for our complete terms and conditions.
        </div>
        <div className="mx-12 my-8">
          <h3 className="text-xl font-bold">Package Inclusions</h3>
          <ul className="list-disc list-inside ml-1 leading-normal">
            <li>Hotel stay including breakfast and WIFI for selected travel dates</li>
            <ul className="list-inside ml-8" style={{ listStyleType: 'circle' }}>
              <li>Dates below are check-in and check-out dates:</li>
              <ul className="list-inside ml-8" style={{ listStyleType: 'square' }}>
                <li>5-nights (Fri to Wed): Feb 17 to 22, 2023</li>
                <li>6-nights (Thu to Wed): Feb 16 to 22, 2023</li>
                <li>7-nights (Wed to Wed): Feb 15 to 22, 2023</li>
                <li>8-nights (Wed to Thu): Feb 15 to 23, 2023</li>
                <li>Additional options available on request (e.g. Thu to Thu etc.)</li>
              </ul>
            </ul>
            <li>Round trip airport transfer and transportation to all events included in package</li>
            <li>Costume concierge (includes registration + delivery; does NOT include costume cost) </li>
            <li>Exclusive Jammers’ fete, We Cruisin’ - a Down De Islands Experience</li>
            <li>Two (2) events or activities; choose from:</li>
            <ul className="list-inside ml-8" style={{ listStyleType: 'circle' }}>
              <li>Drinks inclusive fete</li>
              <li>Traditional jouvert</li>
              <li>Traditional Carnival event (Soca Monarch, Pan Finals etc.)</li>
              <li>Local tour</li>
            </ul>
            <li>Carnival experience concierge + support from your Planners!</li>
            <li>Pre-departure preparation</li>
            <li>On the ground support</li>
            <li>Exclusive Jammers Forum</li>
          </ul>
        </div>
      </div>
      <div className="h-9 bg-purple-900 text-white text-center text-lg p-1">
        We do de plannin’ while you do de jammin’!
      </div>
    </div>
  )
}
