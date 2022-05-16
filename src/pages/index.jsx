import useSWR from 'swr'
import Head from 'next/head'
import { formatCADCurrency } from '../utils/currency'
import { format } from 'date-fns'
import Image from 'next/image'
import FullPageLoader from '@components/Invoice/FullPageLoader'
import InstallmentTable from '@components/Invoice/LineItem/InstallmentTable'

const fetcher = async url => {
  const res = await fetch(url)

  // Follow the redirect
  if (res.redirected && res.status === 200) {
    // we can add a callbackUrl param with an encoded string to bring the user back to the page they were on
    window.location.replace(`${res.url}`)
  }

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

export default function Home() {
  const { data, error } = useSWR(`/api/transactions/invoices/getInvoicesByUser/1`, fetcher)

  // TEMPORARY
  if (error) return <div>Failed to Load</div>
  if (!data) return <FullPageLoader />

  const tableColumnLabels = ['Qty', 'Package ID', 'Occupancy', 'Price Per Person', 'Package Total']

  const buildTableBody = details =>
    details.map((detail, index) => (
      <div key={index} className="py-2">
        <div className="sm:hidden font-bold text-neutral-500">{tableColumnLabels[index]}</div>
        <div className="whitespace-nowrap sm:px-2 sm:py-2">{detail}</div>
      </div>
    ))

  return (
    <>
      <Head>
        <title>Jammer Payment Portal | We Plan You Jam</title>
        <meta
          name="description"
          content="The Jammer payment portal allows you to pay for your selected packages, fetes and other add-ons."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="-mt-6">
        <div className="text-center mb-8">
          <Image alt="wpyj logo" src="/images/wpyj-logo.png" width={200} height={200} />
          <h1 className="text-3xl font-bold text-purple-900">Welcome back to the Jammer Payment Portal</h1>
          <p>Below you'll find a listing of your invoices</p>
        </div>
        <div className="my-8">
          {(data.length && (
            <div>
              {data.map(invoice => (
                <div key={invoice.id} className="block py-2 first:pt-0">
                  {/* Invoice Header */}
                  <header className="flex justify-between bg-purple-800 text-white font-bold py-2 px-4 rounded">
                    <div className="">
                      <span className="text-xs uppercase mr-1">Invoice:</span> {invoice.id}
                    </div>
                    <div>
                      <span className="text-xs uppercase mr-1">Current Balance:</span>{' '}
                      <span className="text-lg">{formatCADCurrency(invoice.fields['Balance'])}</span>
                    </div>
                  </header>
                  {/* Invoice Content */}
                  <div className="px-4 py-6">
                    {/* Line Items */}
                    {(invoice.fields.lineItemRecords &&
                      invoice.fields.lineItemRecords.map(lineItem => (
                        <div
                          key={lineItem['Line Item UUID']}
                          className="grid md:gap-6 md:grid-cols-3 mb-4 border-b border-slate-200 sm:border-0 sm:mb-0"
                        >
                          {/* Left Column */}
                          <div className="col-span-2 space-y-4">
                            {/* Title */}
                            <h2 className="mb-4 flex items-center space-x-2">
                              <span className="text-xs font-bold text-white bg-pink-600 uppercase py-1 px-3 rounded-full">
                                {lineItem['Product Type']}
                              </span>
                              <span className="text-xl font-extrabold">
                                {`${lineItem?.productRecord?.Hotel} – ${lineItem?.productRecord['Short Description']}, ${lineItem?.productRecord['Number of Nights']}`}
                              </span>
                            </h2>
                            {/* Meta */}
                            <div className="grid md:grid-cols-2">
                              <div>
                                <span className="text-xs text-purple-900 uppercase font-bold">Check-in:</span>{' '}
                                {format(new Date(lineItem?.productRecord['Check-in']), 'eeee MMMM d, yyyy')}
                              </div>
                              <div>
                                <span className="text-xs text-purple-900 uppercase font-bold">Check-out:</span>{' '}
                                {format(new Date(lineItem?.productRecord['Check-out']), 'eeee MMMM d, yyyy')}
                              </div>
                            </div>
                            <div>
                              {/* Table header */}
                              <div className="hidden sm:grid grid-cols-[10%_28%_18%_24%_20%] text-xs font-bold uppercase text-slate-700 bg-slate-100 border-b border-slate-200">
                                {tableColumnLabels.map((title, index) => (
                                  <div key={index} className="px-2 py-1 whitespace-nowrap">
                                    <div className="font-semibold">{title}</div>
                                  </div>
                                ))}
                              </div>
                              {/* Table body */}
                              <div className="w-full mb-4">
                                <div className="grid flex-wrap grid-cols-2 grid-rows-3 text-sm sm:grid-cols-[10%_28%_18%_24%_20%] sm:grid-rows-1 ">
                                  {buildTableBody([
                                    lineItem.Qty,
                                    lineItem['Product ID'],
                                    lineItem.productRecord.Occupancy,
                                    formatCADCurrency(lineItem.Rate),
                                    formatCADCurrency(lineItem.Rate * lineItem.Qty),
                                  ])}
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Right Column */}
                          <div>
                            <div className="shadow-xl rounded overflow-hidden mb-4">
                              <Image
                                alt="Line Item Image"
                                layout="responsive"
                                src={lineItem.productRecord['Image (from Room Code)'][0].thumbnails.large.url}
                                width={lineItem.productRecord['Image (from Room Code)'][0].thumbnails.large.width}
                                height={lineItem.productRecord['Image (from Room Code)'][0].thumbnails.large.height}
                              />
                            </div>
                          </div>
                        </div>
                      ))) ||
                      null}

                    {/* Payment Schedule */}
                    {invoice.fields?.installmentRecords ? (
                      <div>
                        <h2 className="text-xs text-purple-900 uppercase font-bold border-b border-slate-200 py-1 mt-6">
                          Installment Schedule
                        </h2>
                        <InstallmentTable
                          records={invoice.fields.installmentRecords}
                          payments={invoice.fields?.paymentRecords}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )) || <p>No invoices found</p>}
        </div>
      </main>
    </>
  )
}
