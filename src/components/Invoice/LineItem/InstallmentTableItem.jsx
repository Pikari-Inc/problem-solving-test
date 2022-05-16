import Link from 'next/link'
import { parseISO, isToday, isTomorrow, isBefore, add } from 'date-fns'
import { formatCADCurrency } from '@utils/currency'
import { WiPayButton } from '@components/PayNowButton'

const tdStyle = 'py-3 px-2 whitespace-nowrap flex flex-col sm:flex-row'

const Status = ({ paid, dueDate }) => {
  const due = parseISO(dueDate)

  let paymentStatus = null
  switch (paid) {
    case 'paid':
      paymentStatus = <span className="capitalize text-green-700">✓ {paid}</span>
      break
    case 'failed':
      paymentStatus = <span className="capitalize text-red-700">✕ {paid}</span>
      break
    default:
      break
  }

  const today = isToday(due) ? 'Due Today!' : false
  const tomorrow = isTomorrow(due) ? 'Due Tomorrow' : false
  const overdue = isBefore(due, new Date()) ? <span className="text-pink-700 font-bold">🚨 Overdue</span> : false
  const dueSoon = isBefore(due, add(new Date(), { days: 5 })) ? 'Due Soon' : false

  return <>{paymentStatus || today || tomorrow || overdue || dueSoon || null}</>
}

function InstallmentTableItem({ item, labels }) {
  //Dont like this - hard to read
  const buildTableRow = row => {
    const details = [
      row['Due Date'],
      row['Type'],
      // eslint-disable-next-line react/jsx-key
      <Status paid={row.status} dueDate={row['Due Date']} />,
      formatCADCurrency(row['Amount']),
      row.status !== 'paid' ? (
        <WiPayButton
          total={row['Amount']}
          orderId={row['Invoice'][0]}
          data={{
            installmentUUID: row['Installment UUID'],
            type: row['Type'],
            firstName: 'John',
            email: 'development@pikari.io',
          }}
        >
          Pay Now
        </WiPayButton>
      ) : (
        ''
      ),
    ]

    return details.map((detail, index) => (
      <div
        key={index}
        className={tdStyle}
        style={index == details.length - 1 ? { justifyContent: 'center', padding: '0.5rem' } : null}
      >
        <div className="font-bold text-neutral-500 sm:hidden">{labels[index]}</div>
        <div>{detail}</div>
      </div>
    ))
  }

  return (
    <div className="grid flex-wrap grid-cols-2 grid-rows-3 text-sm border-b border-slate-200 sm:grid-cols-5 sm:grid-rows-1 sm:h-11">
      {buildTableRow(item)}
    </div>
  )
}

export default InstallmentTableItem
