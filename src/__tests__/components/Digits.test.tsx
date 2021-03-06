import { shallow } from "enzyme";
import * as React from "react";
import { Digit, DigitOrDot } from "../../application/components/Digit";
import { Digits, IDigitsProps } from "../../application/components/Digits";

const defaultProps: IDigitsProps = {
  digits: [7]
};

it("should render correct Digit components", () => {
  const sequence: DigitOrDot[] = [0, 2, "dot", 2, 7];
  const element = shallow(<Digits {...defaultProps} digits={sequence} />);
  expect(element.find("div.digits").length).toBe(1);
  expect(element.find(Digit).get(0).props.digit).toBe(0);
  expect(element.find(Digit).get(1).props.digit).toBe(2);
  expect(element.find(Digit).get(2).props.digit).toBe("dot");
  expect(element.find(Digit).get(3).props.digit).toBe(2);
  expect(element.find(Digit).get(4).props.digit).toBe(7);
});
