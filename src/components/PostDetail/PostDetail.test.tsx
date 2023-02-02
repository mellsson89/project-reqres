import {render, screen } from "@testing-library/react";
import PostDetail from "./PostDetail";
import '@testing-library/jest-dom'

const data = {
    id:1,
    name:'test',
    year:2003,
    color:'#ffffff',
    pantone_value:'433443-5'
}
describe('PostDetail component', () => {
    it('PostDetail renders', ()=> {
        render(<PostDetail post={data}/>);

        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getByText(/test/)).toBeInTheDocument();
    })


})