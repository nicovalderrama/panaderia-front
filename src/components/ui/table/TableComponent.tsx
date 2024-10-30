'use client'

import React from 'react'

interface Action {
  label: string
  onClick: (item: any) => void
}

interface TableProps {
  headers: string[]
  data: any[]
  actions?: Action[]
}

export const TableComponent = ({ headers, data, actions }: TableProps) => {
    // const actions = [
    //     {
    //         label: 'add_box',
    //         onClick: (item: Producto) => {
    //             setOpen(true)
    //             setRow(item)
    //         },
    //     }
    // ]

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
            {actions && <th scope="col" className="px-6 py-3">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
              {Object.keys(row).map((cell: any, cellIndex: any) => (
                cell !== 'imagen' ?
                  <td key={cellIndex} className="px-6 py-4">
                    {row[cell]}
                  </td> : ''

              ))}
              {actions && (
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => action.onClick(row)}
                        className={`font-medium rounded-lg text-sm px-3 py-1.5 text-center`}
                      >
                        <span className="material-symbols-outlined">
                          {action.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}