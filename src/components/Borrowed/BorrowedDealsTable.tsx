import React, {useState} from 'react';
import {Table} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import {CgMoreVertical, CgMoreVerticalAlt} from 'react-icons/cg';
import {readFileSync} from "fs";
import Popup from "reactjs-popup";
import {GrClose} from "react-icons/gr";
import {Button, Form} from "semantic-ui-react";
import BorrowedDealCard from "./BorrowedDealCard";

const {Column, HeaderCell, Cell, Pagination} = Table;
const BorrowedDealsTable = ({deals, personId, setDeals}: any) => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);
    const deleteHandler = () => {
        closeModal();
    };
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
                    <HeaderCell>اجرت</HeaderCell>
                    <Cell dataKey="ojrat"/>
                </Column>
                <Column>
                    <HeaderCell>درصد اجرت طلا</HeaderCell>
                    <Cell dataKey="ojratProfit"/>
                </Column>

                <Column>
                    <HeaderCell>فروخته به</HeaderCell>
                    <Cell dataKey="buyerName"/>
                </Column>
                <Column>
                    <HeaderCell>در تاریخ</HeaderCell>
                    <Cell>{(rowData: any, rowIndex: number) => {
                        return rowData.soldDate.year + " / " + rowData.soldDate.month + " / " + rowData.soldDate.day;
                    }}</Cell>
                    {/*<Cell dataKey="date.day"/>*/}
                </Column>
                <Column>
                    <HeaderCell>بستانکار طلا</HeaderCell>
                    <Cell dataKey="curOGold"/>
                </Column>

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
                    <BorrowedDealCard deal={chosenDeal} personId={personId} setDeals={setDeals} handler={deleteHandler}/>
                </div>
            </Popup>
        </div>
    );
};
export default BorrowedDealsTable