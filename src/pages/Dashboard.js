import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Dashboard.css'
import { Doughnut } from 'react-chartjs-2';
import { getWidgets, getWidgetsCategory } from '../Service/allApi';
import StackedBarChart from '../components/StackedBarChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement, plugins } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement);
function Dashboard({ searchelement }) {
    const [widgetproducts, setWidgetProducts] = useState([]);
    const [cspmWidget, setCspmWidget] = useState([]);
    const [checkedWidget, setCheckedWidget] = useState({});
    const [filteredWidgets, setFilteredWidgets] = useState([]);

    useEffect(() => {
        getWidget();
        csmpCat("CSPM Executive Dashboard")
    }, []);

    useEffect(() => {
        filterWidgets();
    }, [searchelement.search, widgetproducts, checkedWidget]);

    const textCenter = {
        id: 'textCenter',
        beforeDatasetsDraw(chart, args, pluginOption) {
            const { ctx, data } = chart
            ctx.save()
            ctx.font = 'bolder 20px Arial'
            ctx.fillStyle = 'black'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(`${data.datasets[0].data[0]}`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y)
            ctx.fillText('Total', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + 20)
        }
    }
    // for getting all the widgets
    const getWidget = async () => { 
        const result = await getWidgets();
        setWidgetProducts(result.data);
    };

    const csmpCat = async (search) => {
        const result = await getWidgetsCategory(search);
        setCspmWidget(result.data);
    };
    //it trigger when the checkbox state is changed
    const checkboxChange = (category, index) => {
        setCheckedWidget({
            ...checkedWidget,
            [`${category}-${index}`]: !checkedWidget[`${category}-${index}`],
        });
    };
    // filtering the data based on search element and checkbox 
    const filterWidgets = () => {
        console.log(searchelement);

        const filtered = widgetproducts.map((i) => ({
            ...i,
            widgets: i.widgets.filter((widget, index) => {
                const matchesSearch = typeof searchelement.search === 'string'
                    ? widget.title.toLowerCase().includes(searchelement.search.toLowerCase())
                    : true;
                const isChecked = checkedWidget[`${i.category}-${index}`] !== false;
                return matchesSearch && isChecked;
            }),
        })).filter(i => i.widgets.length > 0);

        setFilteredWidgets(filtered);
    };

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <h5 className='pt-5 ps-3'>CNAPP Dashboard</h5>
                <div className='headers'>
                <div>
                    <button className='btn2 p-2' type='button' data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                         Add Widget <i className="fa-solid fa-plus ms-2"></i>
                    </button>

                </div>
                <div className='ms-3  d-none d-sm-flex'>
                    <button className='btn2 p-2' type='button'>
                        <i class="fa-solid fa-arrows-rotate"></i>
                    </button>

                </div>
                <div className='ms-3  d-none d-sm-flex'>
                    <button className='btn2 p-2' type='button'>
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                </div>
                <div className='ms-3 me-3  d-none d-sm-flex'>
                    <div class="dropdown" >
                        <button class="btn2 p-2 dropdown-toggle" 
                        style={{border: "2px solid #05214d"}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                         <i class="btn4 fa-solid fa-clock"></i>   Last 2 days
                         
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#"></a></li>
                            <li><a class="dropdown-item" href="#"></a></li>
                            <li><a class="dropdown-item" href="#"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
            <div>
                <div className='m-3'>
                    {filteredWidgets.length > 0 ? (
                        <div>
                            {filteredWidgets.map((i, categoryIndex) => (
                                <div key={categoryIndex}>
                                    <h6 className='ps-2 pt-3'>{i.category}</h6>
                                    <div>
                                        <Row>
                                            {i.widgets.map((widget, widgetIndex) => (
                                                <Col sm={12} md={6} lg={4} key={widgetIndex} className='m-2'>
                                                    <Card style={{ height: '20rem', borderRadius: '20px' }} className='p-3 shadow'>
                                                        <Col>
                                                            <h6>{widget.title}</h6>
                                                            {widget.type === "doughnut" && widget.id !== "widget2" && (
                                                                <Doughnut
                                                                    plugins={[textCenter]}
                                                                    data={{
                                                                        labels: widget.data.labels,
                                                                        datasets: [{
                                                                            data: widget.data.values,
                                                                            backgroundColor: widget.data.backgroundColor
                                                                        }],
                                                                    }}
                                                                    options={{
                                                                        responsive: false,
                                                                        maintainAspectRatio: false,
                                                                        layout: {
                                                                            padding: {
                                                                              
                                                                              top:20,
                                                                              bottom:20  
                                                                          }
                                                                        },
                                                                        plugins: {
                                                                            legend: {
                                                                                display: true,
                                                                                position: 'right',
                                                                                labels: {
                                                                                    boxWidth: 12,
                                                                                    font: {
                                                                                        size: 12
                                                                                    },
                                                                                    
                                                                                    padding:12,
                                                                                    generateLabels: (chart) => {
                                                                                        const data = chart.data;
                                                                                        if (data.labels.length && data.datasets.length) {
                                                                                            return data.labels.map((label, i) => {
                                                                                                const values = data.datasets[0].data[i];
                                                                                                const backgroundColor = data.datasets[0].backgroundColor[i]
                                                                                                return {
                                                                                                    text: `${label} (${values})`,
                                                                                                    fillStyle: backgroundColor,
                                                                                                    hidden: isNaN(data.datasets[0].data[i]),
                                                                                                    index: i
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                        return []
                                                                                    }

                                                                                }
                                                                            },
                                                                            tooltip: {
                                                                                enabled: true
                                                                            }
                                                                        },
                                                                        cutout: '70%'
                                                                    }}
                                                                    width={350}
                                                                    height={250}
                                                                />
                                                            )}
                                                            {widget.type === "doughnut" && widget.id === "widget2" && (
                                                                <Doughnut
                                                                    plugins={[textCenter]}
                                                                    data={{
                                                                        labels: widget.data.labels,
                                                                        datasets: [{
                                                                            data: widget.data.values,
                                                                            backgroundColor: widget.data.backgroundColor
                                                                        }],
                                                                    }}
                                                                    options={{
                                                                        responsive: false,
                                                                        maintainAspectRatio: true,
                                                                        aspectRatio:3,
                                                                        layout: {
                                                                            padding: {
                                                                            
                                                                                top:20,
                                                                                bottom:20  
   
                                                                            }
                                                                        },
                                                                        plugins: {
                                                                            legend: {
                                                                                display: true,
                                                                                position: 'right',
                                                                                align: 'center',
                                                                                labels: {
                                                                                    boxWidth: 12,
                                                                                    font: {
                                                                                        size: 12
                                                                                    },
                                                                                    padding:12,
                                                                                    generateLabels: (chart) => {
                                                                                        const data = chart.data;
                                                                                        if (data.labels.length && data.datasets.length) {
                                                                                            return data.labels.map((label, i) => {
                                                                                                const values = data.datasets[0].data[i];
                                                                                                const backgroundColor = data.datasets[0].backgroundColor[i]
                                                                                                return {
                                                                                                    text: `${label} (${values})`,
                                                                                                    fillStyle: backgroundColor,
                                                                                                    hidden: isNaN(data.datasets[0].data[i]),
                                                                                                    index: i
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                        return []
                                                                                    }
                                                                                }
                                                                            },
                                                                            tooltip: {
                                                                                enabled: true
                                                                            }
                                                                        },
                                                                        cutout: '70%'
                                                                    }}
                                                                    width={350}
                                                                    height={250}
                                                                />
                                                            )}
                                                            {widget.type === "stackedBarchart" && (
                                                                //  to create stacked bar chart
                                                                <StackedBarChart className='pt-5' data={widget.data} />
                                                            )}
                                                            {widget.type === "" && (
                                                                <div className='m-5'>
                                                                    <div className='d-flex justify-content-center'>
                                                                        <img src="https://i.postimg.cc/13fZcjYS/growth-removebg-preview.png"
                                                                            style={{ height: '100px', width: '100px' }}
                                                                        />
                                                                    </div>
                                                                    <div className='d-flex justify-content-center'>
                                                                        <span>No graph data available</span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Col>
                                                    </Card>
                                                </Col>
                                            ))}
                                            <Col className='mt-2'>
                                                <Card style={{ height: '20rem', borderRadius: '20px' }} className='p-3 shadow'>
                                                    <div className='m-5'>
                                                        <div className='d-flex justify-content-center'>
                                                            <div className='mt-5'>
                                                                <button className='btn3 p-2' type='button' data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                                                                    <i className="fa-solid fa-plus"></i> Add widget
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                                <div className="offcanvas offcanvas-end offcanvas-items" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                                                    <div className="offcanvas-header" style={{ backgroundColor: '#05214d' }}>
                                                        <h5 className="offcanvas-title" id="offcanvasExampleLabel" style={{ color: 'aliceblue' }}>Add widget</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                    </div>
                                                    <div className="offcanvas-body">
                                                        <div className='d-flex align-items-center'>
                                                            Personalize your dashboard by adding the following widget
                                                        </div>
                                                        <div className="d-flex">
                                                            <ul className="nav nav-underline">
                                                                <li className="nav-item">
                                                                    <a className="nav-link" onClick={() => csmpCat("CSPM Executive Dashboard")} style={{ color: 'black' }} aria-current="page">CSPM</a>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <a className="nav-link" onClick={() => csmpCat("CWPP Dashboard")} style={{ color: 'gray' }} href="#">CWPP</a>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <a className="nav-link" style={{ color: 'gray' }} href="#">Image</a>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <a className="nav-link" style={{ color: 'gray' }}>Ticket</a>
                                                                </li>
                                                            </ul>
                                                        </div>

                                                        <div>
                                                            {cspmWidget.length > 0 && cspmWidget[0].widgets ? (
                                                                cspmWidget[0].widgets.map((i, index) => (
                                                                    <div key={index}>
                                                                        <div style={{ border: '1px solid' }} className='mt-2'>
                                                                            <Form className='d-flex'>
                                                                                <input
                                                                                    className="form-check-inputs m-1"
                                                                                    type="checkbox"
                                                                                    id={`checkbox-${index}`}
                                                                                    checked={checkedWidget[`${cspmWidget[0].category}-${index}`] !== false}
                                                                                    onChange={() => checkboxChange(cspmWidget[0].category, index)} />
                                                                                <label className="form-check-label" htmlFor={`checkbox-${index}`}>{`${i.title}`}</label>
                                                                            </Form>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <h1>No elements found</h1>
                                                            )}
                                                        </div>
                                                        <div className="buttonGroup">
                                                            <Button className='m-3' variant="light" data-bs-dismiss="offcanvas">Cancel</Button>{' '}
                                                            <Button className='me-3' style={{ backgroundColor: '#05214d' }}>Confirm</Button>{' '}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h1>No elements found</h1>
                    )}
                </div>
            </div>
        </div>
    );}
export default Dashboard
