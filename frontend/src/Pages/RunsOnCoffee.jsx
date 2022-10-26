import React from 'react';
import { MUIAccordian } from '../Layout/MUI/Accordian/MUI-Accordian';
import { MUIAccordianDetail } from '../Layout/MUI/Accordian/MUI-Accordian-Details';
import { MUIAccordianSummary } from '../Layout/MUI/Accordian/MUI-Accordian-Summary';
import PageLayout from '../Layout/PageLayout';

const RunsOnCoffee = () => {
    return <PageLayout>
        <MUIAccordian>
            <MUIAccordianSummary Title='my title' />
            <MUIAccordianDetail>
                This is my text
            </MUIAccordianDetail>
        </MUIAccordian>
    </PageLayout>
}

export default RunsOnCoffee;
