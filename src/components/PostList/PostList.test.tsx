import {render, screen } from "@testing-library/react";
import PostList from "./PostList";
import '@testing-library/jest-dom'

const data = {
    id:1,
    name:'test',
    year:2003,
    color:'#ffffff',
    pantone_value:'433443-5'
}
const onClick= jest.fn()
describe('PostDetail component', () => {
    it('PostDetail renders', ()=> {
        render(<PostList post={data} onClickModal={onClick}/>);

        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getByText(/test/)).toBeInTheDocument();
    })


})