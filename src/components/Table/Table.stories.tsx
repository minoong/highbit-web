import type { ComponentStory, ComponentMeta } from '@storybook/react'

import React from 'react'

import { Table } from '~/components/Table'

import '../../app/globals.css'

export default {
 title: 'components/Table',
 component: Table,
} as ComponentMeta<typeof Table>

const Template: ComponentStory<typeof Table> = (args) => (
 <Table hoverable striped {...args}>
  <Table.Head>
   <Table.HeadCell>Product name</Table.HeadCell>
   <Table.HeadCell>Color</Table.HeadCell>
   <Table.HeadCell>Category</Table.HeadCell>
   <Table.HeadCell>Price</Table.HeadCell>
   <Table.HeadCell>
    <span className="sr-only">Edit</span>
   </Table.HeadCell>
  </Table.Head>
  <Table.Body className="divide-y">
   <Table.Row className="bg-white">
    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">Apple MacBook Pro 17</Table.Cell>
    <Table.Cell>Sliver</Table.Cell>
    <Table.Cell>Laptop</Table.Cell>
    <Table.Cell>$2999</Table.Cell>
    <Table.Cell>
     <a href="/tables" className="font-medium text-blue-600 hover:underline">
      Edit
     </a>
    </Table.Cell>
   </Table.Row>
   <Table.Row className="bg-white">
    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">Microsoft Surface Pro</Table.Cell>
    <Table.Cell>White</Table.Cell>
    <Table.Cell>Laptop PC</Table.Cell>
    <Table.Cell>$1999</Table.Cell>
    <Table.Cell>
     <a href="/tables" className="font-medium text-blue-600 hover:underline">
      Edit
     </a>
    </Table.Cell>
   </Table.Row>
   <Table.Row className="bg-white">
    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">Magic Mouse 2</Table.Cell>
    <Table.Cell>Black</Table.Cell>
    <Table.Cell>Accessories</Table.Cell>
    <Table.Cell>$99</Table.Cell>
    <Table.Cell>
     <a href="/tables" className="font-medium text-blue-600 hover:underline">
      Edit
     </a>
    </Table.Cell>
   </Table.Row>
  </Table.Body>
 </Table>
)

export const Primary = Template.bind({})
Primary.args = {
 width: 'w-full',
}
