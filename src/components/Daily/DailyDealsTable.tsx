import React, {useState} from 'react';
import {Table} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import {CgMoreVertical, CgMoreVerticalAlt} from 'react-icons/cg';
import {readFileSync} from "fs";
import Popup from "reactjs-popup";
import {GrClose} from "react-icons/gr";
import {Button, Form} from "semantic-ui-react";
import DailyDealCard from "./DailyDealCard";

const {Column, HeaderCell, Cell, Pagination} = Table;
const DailyDealsTable = ({deals, personId}: any) => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);
    const [chosenDeal, setChosenDeal] = useState(null);
    return (
        <div>
            <Table
                style={{borderRadius: 10, color: "black"}}
                height={450}
                // autoHeight
                data={deals}
                defaultExpandAllRows
                // loading
                onRowClick={data => {
                    console.log(data);
                    setChosenDeal(data);
                    openModal();
                }}
                onRowContextMenu={(data, event) => {
                    // alert(JSON.stringify(data))
                    return (
                        <div className="bg-success">
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


                {/*<Column width={200}>*/}
                {/*    <HeaderCell>Action</HeaderCell>*/}

                {/*    <Cell>*/}
                {/*        {(rowData: any) => {*/}
                {/*            function handleAction() {*/}
                {/*                alert(`id:${rowData.id}`);*/}
                {/*            }*/}
                {/*            return (*/}
                {/*                <div className="pt-0 mt-0">*/}
                {/*                    <a className="btn btn-primary btn-sm" onClick={handleAction}> ویرایش </a>*/}
                {/*                    <a className="btn btn-danger btn-sm" onClick={handleAction}> حذف </a>*/}
                {/*                </div>*/}
                {/*            );*/}
                {/*        }}*/}
                {/*    </Cell>*/}
                {/*</Column>*/}
            </Table>
            <Popup
                open={open}
                // closeOnDocumentClick={false}
                contentStyle={{width: 350, borderRadius: 15}}
                onClose={closeModal}
                className="container"
            >
                <div className="">
                    <a className="float-right mr-1"><GrClose onClick={closeModal}/></a>
                    <br/>
                    <DailyDealCard deal={chosenDeal} personId={personId}/>
                </div>
            </Popup>
        </div>
    );
};
export default DailyDealsTable