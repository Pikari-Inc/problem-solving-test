import InstallmentTableItem from './InstallmentTableItem'

function InstallmentTable({ records, payments }) {
  if (!records) return null

  let mergedRecords = [...records]

  // Loop over payments and flag installment as paid if id's match and payment has been made
  if (payments) {
    mergedRecords = records.map(record => {
      const foundPayments = payments.filter(payment => payment['Installment UUID'].includes(record['Installment UUID']))

      if (foundPayments) {
        let recentPayment = foundPayments[0]
        if (foundPayments.length > 1) {
          // multiple payment attemps can be made on one installmant - get the most recent one
          const sortedPayments = foundPayments.sort((a, b) => new Date(b.Created) - new Date(a.Created))
          recentPayment = sortedPayments[0]
        }

        if (recentPayment) {
          if (recentPayment.Status == 'success') {
            record.status = 'paid'
          } else {
            record.status = 'failed'
          }
        }
      }
      return record
    })
  }

  const tableColumnLabels = ['Due Date', 'Type', 'Status', 'Amount', 'Action']

  return (
    <div className="flex flex-row w-full sm:flex-col">
      {/* Table header */}
      <div className="hidden sm:grid grid-cols-5 text-xs font-bold uppercase text-slate-700 bg-slate-100 border-b border-slate-200">
        {tableColumnLabels.map((title, index) => (
          <div key={index} className="px-2 py-1 whitespace-nowrap text-left last:text-center last:pr-4">
            <div className="font-semibold">{title}</div>
          </div>
        ))}
      </div>
      {/* Table body */}
      <div className="w-full">
        {mergedRecords
          .sort((a, b) => new Date(a['Due Date']) - new Date(b['Due Date']))
          .map(ir => (
            <InstallmentTableItem key={ir['Installment UUID']} item={ir} labels={tableColumnLabels} />
          ))}
      </div>
    </div>
  )
}

export default InstallmentTable
