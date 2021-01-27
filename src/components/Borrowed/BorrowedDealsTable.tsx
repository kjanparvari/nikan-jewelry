import React, {useEffect, useState} from 'react';
import {Table} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import {CgMoreVertical, CgMoreVerticalAlt} from 'react-icons/cg';
import {readFileSync} from "fs";
import Popup from "reactjs-popup";
import {GrClose} from "react-icons/gr";
import {Button, Form} from "semantic-ui-react";
import BorrowedDealCard from "./BorrowedDealCard";
import NumberFormat from "react-number-format";
import {DECIMAL_SEPARATOR, THOUSAND_SEPARATOR} from "../../App";

const {Column, HeaderCell, Cell, Pagination} = Table;
const BorrowedDealsTable = ({deals, personId, setDeals, editOwings, printContentRef, autoHeight}: any) => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);
    const deleteHandler = () => {
        closeModal();
    };
    const [chosenDeal, setChosenDeal] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sortColumn, setSortColumn] = useState<any>();
    const [sortType, setSortType] = useState<any>();
    const [data, setData] = useState([...deals]);
    useEffect(() => {
        setTimeout(()=>{
            printContentRef.current.scrollTop(Number.MAX_SAFE_INTEGER);
        }, 50);
    }, [data.length]);
    const handleSortColumn = (_sortColumn: any, _sortType: any) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(_sortColumn);
            setSortType(_sortType);
        }, 250);
    };
    useEffect(() => {
        setData([...deals]);
    }, [deals]);
    const getData = () => {
        if (sortColumn && sortType) {
            return data.sort((a: any, b: any) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if (x.month !== undefined && y.month !== undefined) {
                    if (sortType === 'asc') {
                        if (x.year > y.year)
                            return 1;
                        else if (x.year === y.year) {
                            if (x.month > y.month)
                                return 1;
                            else if (x.month === y.month) {
                                if (x.day > y.day)
                                    return 1;
                                else if (x.day === -y.day)
                                    return 0;
                            }
                        }
                        return -1;
                    } else if (sortType === 'desc') {
                        if (x.year > y.year)
                            return -1;
                        else if (x.year === y.year) {
                            if (x.month > y.month)
                                return -1;
                            else if (x.month === y.month) {
                                if (x.day > y.day)
                                    return -1;
                                else if (x.day === -y.day)
                                    return 0;
                            }
                        }
                        return 1;
                    }
                }
                if (typeof x === 'string') {
                    x = x.charCodeAt(0);
                }
                if (typeof y === 'string') {
                    y = y.charCodeAt(0);
                }
                if (x.profit !== undefined && y.profit !== undefined) {
                    x = (x.ojrat + x.fi) * (1.0 + (x.profit) / 100);
                    y = (y.ojrat + y.fi) * (1.0 + (y.profit) / 100);
                }
                if (sortType === 'asc') {
                    return x - y;
                } else {
                    return y - x;
                }
            });
        }
        return data;
    };
    return (
        <div>
            <Table
                ref={printContentRef}
                style={{borderRadius: 10, color: "black"}}
                height={450}
                autoHeight={autoHeight}
                data={getData()}
                loading={loading}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
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

                <Column sortable fixed resizable>
                    <HeaderCell>تاریخ</HeaderCell>
                    <Cell dataKey={"date"}>{(rowData: any, rowIndex: number) => {
                        return rowData.date.year + " / " + rowData.date.month + " / " + rowData.date.day;
                    }}</Cell>
                    {/*<Cell dataKey="date.day"/>*/}
                </Column>

                <Column sortable resizable>
                    <HeaderCell>شماره صفحه</HeaderCell>
                    <Cell dataKey={"pageNumber"}>
                        {
                            (rowData: any, rowIndex: number) => {
                                const {pageNumber} = rowData;
                                return <NumberFormat value={pageNumber}
                                                     displayType="text"
                                                     decimalSeparator={DECIMAL_SEPARATOR}
                                                     thousandSeparator={THOUSAND_SEPARATOR}/>;
                            }
                        }
                    </Cell>
                </Column>

                <Column sortable resizable>
                    <HeaderCell>ورود طلا</HeaderCell>
                    <Cell dataKey={"goldIn"}>
                        {
                            (rowData: any, rowIndex: number) => {
                                const {goldIn} = rowData;
                                return <NumberFormat value={goldIn}
                                                     displayType="text"
                                                     decimalSeparator={DECIMAL_SEPARATOR}
                                                     thousandSeparator={THOUSAND_SEPARATOR}/>;
                            }
                        }
                    </Cell>
                </Column>

                <Column sortable resizable>
                    <HeaderCell>خروج طلا</HeaderCell>
                    <Cell dataKey={"goldOut"}>
                        {
                            (rowData: any, rowIndex: number) => {
                                const {goldOut} = rowData;
                                return <NumberFormat value={goldOut}
                                                     displayType="text"
                                                     decimalSeparator={DECIMAL_SEPARATOR}
                                                     thousandSeparator={THOUSAND_SEPARATOR}/>;
                            }
                        }
                    </Cell>
                </Column>

                <Column sortable resizable>
                    <HeaderCell>اجرت</HeaderCell>
                    <Cell dataKey={"ojrat"}>
                        {
                            (rowData: any, rowIndex: number) => {
                                const {ojrat} = rowData;
                                return <NumberFormat value={ojrat}
                                                     displayType="text"
                                                     decimalSeparator={DECIMAL_SEPARATOR}
                                                     thousandSeparator={THOUSAND_SEPARATOR}/>;
                            }
                        }
                    </Cell>
                </Column>
                <Column sortable resizable>
                    <HeaderCell>درصد اجرت طلا</HeaderCell>
                    <Cell dataKey={"ojratProfit"}>
                        {
                            (rowData: any, rowIndex: number) => {
                                const {ojratProfit} = rowData;
                                return <NumberFormat value={ojratProfit}
                                                     displayType="text"
                                                     decimalSeparator={DECIMAL_SEPARATOR}
                                                     thousandSeparator={THOUSAND_SEPARATOR}/>;
                            }
                        }
                    </Cell>
                </Column>

                <Column sortable resizable>
                    <HeaderCell>فروخته به</HeaderCell>
                    <Cell dataKey="buyerName"/>
                </Column>
                <Column sortable resizable>
                    <HeaderCell>در تاریخ</HeaderCell>
                    <Cell dataKey={"soldDate"}>{(rowData: any, rowIndex: number) => {
                        return rowData.soldDate.year + " / " + rowData.soldDate.month + " / " + rowData.soldDate.day;
                    }}</Cell>
                    {/*<Cell dataKey="date.day"/>*/}
                </Column>
                <Column sortable resizable>
                    <HeaderCell>بستانکار طلا</HeaderCell>
                    <Cell dataKey={"curOGold"}>
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
                    <BorrowedDealCard deal={chosenDeal} personId={personId} editOwings={editOwings} setDeals={setDeals}
                                      handler={deleteHandler}/>
                </div>
            </Popup>
        </div>
    );
};
export default BorrowedDealsTable