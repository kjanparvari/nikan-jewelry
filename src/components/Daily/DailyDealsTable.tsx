import React, {useState} from 'react';
import {Table} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import {CgMoreVertical, CgMoreVerticalAlt} from 'react-icons/cg';
import {readFileSync} from "fs";
import Popup from "reactjs-popup";
import {GrClose} from "react-icons/gr";
import {Button, Form} from "semantic-ui-react";
import DailyDealCard from "./DailyDealCard";
import DailyUserInfo from "./DailyUserInfo";

const {Column, HeaderCell, Cell, Pagination} = Table;
const DailyDealsTable = ({deals, personId, setDeals, editOwings, printContentRef, autoHeight}: any) => {
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
                ref={printContentRef}
                style={{borderRadius: 10, color: "black"}}
                height={440}
                autoHeight = {autoHeight}
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
                        return ((complex.ojrat + complex.fi) * (1.0 + (complex.profit) / 100));
                    }}</Cell>
                </Column>
                {/*<Column>*/}
                {/*    <HeaderCell>بدهی پول</HeaderCell>*/}
                {/*    /!*<Cell dataKey="moneyOut"/>*!/*/}
                {/*    <Cell dataKey="leftMoney"/>*/}
                {/*</Column>*/}
                <Column>
                    <HeaderCell>بستانکار طلا</HeaderCell>
                    {/*<Cell dataKey="moneyOut"/>*/}
                    {/*<Cell dataKey="leftGold"/>*/}
                    <Cell>
                        {
                            (rowData: any, rowIndex: number) => {
                                const {curOGold} = rowData;
                                return curOGold.toFixed(3);
                            }
                        }
                    </Cell>
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
                    <DailyDealCard deal={chosenDeal} personId={personId} setDeals={setDeals} handler={deleteHandler}  editOwings={editOwings}/>
                </div>
            </Popup>
        </div>
    );
};
export default DailyDealsTable