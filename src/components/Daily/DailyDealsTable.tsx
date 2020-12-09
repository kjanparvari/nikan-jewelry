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
import NumberFormat from "react-number-format";
import {DECIMAL_SEPARATOR, THOUSAND_SEPARATOR} from "../../App";

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
                autoHeight={autoHeight}
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

                <Column fixed>
                    <HeaderCell>تاریخ</HeaderCell>
                    <Cell>{(rowData: any, rowIndex: number) => {
                        return rowData.date.year + " / " + rowData.date.month + " / " + rowData.date.day;
                    }}</Cell>
                    {/*<Cell dataKey="date.day"/>*/}
                </Column>

                <Column sortable>
                    <HeaderCell>شماره صفحه</HeaderCell>
                    <Cell>
                        {
                            (rowData: any, rowIndex: number) => {
                                const {pageNumber} = rowData;
                                return <NumberFormat value={pageNumber} displayType="text"
                                                     decimalSeparator={DECIMAL_SEPARATOR}
                                                     thousandSeparator={THOUSAND_SEPARATOR}/>
                            }
                        }
                    </Cell>
                </Column>

                <Column>
                    <HeaderCell>ورود طلا</HeaderCell>
                    <Cell>
                        {
                            (rowData: any, rowIndex: number) => {
                                const {goldIn} = rowData;
                                return <NumberFormat value={goldIn} displayType="text"
                                                     decimalSeparator={DECIMAL_SEPARATOR}
                                                     thousandSeparator={THOUSAND_SEPARATOR}/>
                            }
                        }
                    </Cell>
                </Column>

                <Column>
                    <HeaderCell>خروج طلا</HeaderCell>
                    <Cell>
                        {
                            (rowData: any, rowIndex: number) => {
                                const {goldOut} = rowData;
                                return <NumberFormat value={goldOut} displayType="text"
                                                     decimalSeparator={DECIMAL_SEPARATOR}
                                                     thousandSeparator={THOUSAND_SEPARATOR}/>
                            }
                        }
                    </Cell>
                </Column>

                <Column>
                    <HeaderCell>ورود پول</HeaderCell>
                    <Cell>
                        {
                            (rowData: any, rowIndex: number) => {
                                const {moneyIn} = rowData;
                                return <NumberFormat value={moneyIn} displayType="text"
                                                     decimalSeparator={DECIMAL_SEPARATOR}
                                                     thousandSeparator={THOUSAND_SEPARATOR}/>
                            }
                        }
                    </Cell>
                </Column>

                <Column>
                    <HeaderCell>خروح پول</HeaderCell>
                    <Cell>
                        {
                            (rowData: any, rowIndex: number) => {
                                const {moneyOut} = rowData;
                                return <NumberFormat value={moneyOut} displayType="text"
                                                     decimalSeparator={DECIMAL_SEPARATOR}
                                                     thousandSeparator={THOUSAND_SEPARATOR}/>
                            }
                        }
                    </Cell>
                </Column>
                <Column>
                    <HeaderCell>درصد اجرت</HeaderCell>
                    <Cell>{(rowData: any, rowIndex: number) => {
                        const {ojratProfit} = rowData;
                        return <NumberFormat value={ojratProfit}
                                             displayType="text"
                                             decimalSeparator={DECIMAL_SEPARATOR}
                                             thousandSeparator={THOUSAND_SEPARATOR}/>;
                    }}</Cell>
                </Column>

                <Column>
                    <HeaderCell>قیمت مرکب</HeaderCell>
                    <Cell>{(rowData: any, rowIndex: number) => {
                        const {complex} = rowData;
                        return <NumberFormat value={(complex.ojrat + complex.fi) * (1.0 + (complex.profit) / 100)}
                                             displayType="text"
                                             decimalSeparator={DECIMAL_SEPARATOR}
                                             thousandSeparator={THOUSAND_SEPARATOR}/>;
                    }}</Cell>
                </Column>
                <Column>
                    <HeaderCell>بستانکار طلا</HeaderCell>
                    <Cell>
                        {
                            (rowData: any, rowIndex: number) => {
                                const {curOGold} = rowData;
                                return <NumberFormat value={curOGold.toFixed(3)}
                                                     displayType="text"
                                                     decimalSeparator={DECIMAL_SEPARATOR}
                                                     thousandSeparator={THOUSAND_SEPARATOR}/>;
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
                    <DailyDealCard deal={chosenDeal} personId={personId} setDeals={setDeals} handler={deleteHandler}
                                   editOwings={editOwings}/>
                </div>
            </Popup>
        </div>
    );
};
export default DailyDealsTable