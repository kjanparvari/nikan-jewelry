import React from 'react';
import {Table} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import {CgMoreVertical, CgMoreVerticalAlt} from 'react-icons/cg';
import {readFileSync} from "fs";
import Popup from "reactjs-popup";

const {Column, HeaderCell, Cell, Pagination} = Table;
const DailyDealsTable = ({deals}: any) => {
    return (
        <div>
            <Table
                style={{borderRadius: 10}}
                height={400}
                data={deals}
                defaultExpandAllRows
                // loading
                onRowClick={data => {
                    console.log(data);
                }}
                onRowContextMenu={(data, event) => {
                    // alert(JSON.stringify(data))
                    return (
                        <div>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    );
                }}
            >
                {/*<Column align="center" fixed>*/}
                {/*    <HeaderCell className="bg-danger">Id</HeaderCell>*/}
                {/*    <Cell dataKey="id"/>*/}
                {/*</Column>*/}

                <Column fixed>
                    <HeaderCell>تاریخ</HeaderCell>
                    <Cell>{(rowData: any, rowIndex: number) => {
                        return rowData.date.year + " / " + rowData.date.month + " / " + rowData.date.day;
                    }}</Cell>
                    {/*<Cell dataKey="date.day"/>*/}
                </Column>

                <Column sortable>
                    <HeaderCell>شماره صفحه</HeaderCell>
                    <Cell dataKey="pageNumber"/>
                </Column>

                <Column>
                    <HeaderCell>ورود طلا</HeaderCell>
                    <Cell dataKey="goldIn"/>
                </Column>

                <Column>
                    <HeaderCell>خروج طلا</HeaderCell>
                    <Cell dataKey="goldOut"/>
                </Column>

                <Column>
                    <HeaderCell>ورود پول</HeaderCell>
                    <Cell dataKey="moneyIn"/>
                </Column>

                <Column>
                    <HeaderCell>خروح پول</HeaderCell>
                    {/*<Cell dataKey="moneyOut"/>*/}
                    <Cell dataKey="moneyOut"/>
                </Column>

                <Column>
                    <HeaderCell>قیمت مرکب</HeaderCell>
                    <Cell>{(rowData: any, rowIndex: number) => {
                        const {complex} = rowData;
                        return ((complex.ojrat + complex.fi) * (1.0 + (complex.profit) / 100)).toFixed(3);
                    }}</Cell>
                </Column>


                <Column width={200}>
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {(rowData: any) => {
                            function handleAction() {
                                alert(`id:${rowData.id}`);
                            }
                            return (
                                <div className="pt-0 mt-0">
                                    <a className="btn btn-primary btn-sm" onClick={handleAction}> ویرایش </a>
                                    <a className="btn btn-danger btn-sm" onClick={handleAction}> حذف </a>
                                </div>
                            );
                        }}
                    </Cell>
                </Column>
            </Table>
        </div>
    );
};
export default DailyDealsTable