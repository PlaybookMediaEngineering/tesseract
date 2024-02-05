import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";
import { Footer } from "../../components/footer";

interface FinancialOverviewProps {
  fullName: string;
  locale: string;
}

const baseUrl =
  process.env.VERCEL_ENV === "production"
    ? "https://midday.ai/email"
    : "http://localhost:3000/email";

export const FinancialOverviewEmail = ({
  fullName = "Viktor Hofte",
}: FinancialOverviewProps) => {
  const firstName = fullName.split(" ").at(0);

  const text = `Hi ${firstName}, We connect to the majority of banks worldwide, making it easier for you to keep track of all your expenses and income in one place. Filter and compare different time periods to better track your business.`;

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Instrument Sans"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/instrumentsans/v1/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr0She1ZuWi3hKpA.woff2",
            format: "woff2",
          }}
        />
        <Font
          fontFamily="Instrument Sans"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/instrumentsans/v1/pximypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr-yp2JGEJOH9npST3-TfykywN2u7ZWwU.woff2",
            format: "woff2",
          }}
          fontWeight={500}
        />
      </Head>
      <Preview>{text}</Preview>
      <Tailwind>
        <Body className="bg-[#fff] my-auto mx-auto font-sans">
          <br />
          <Container className="border border-solid border-[#E8E7E1] rounded my-[40px] mx-auto p-[20px] max-w-[560px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/logo.png`}
                width="45"
                height="45"
                alt="Midday"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-[#121212] text-[21px] font-normal text-center p-0 my-[30px] mx-0">
              Financial Overview
            </Heading>

            <Img
              src={`${baseUrl}/financial-overview-header.png`}
              width="597"
              height="301"
              alt="Overview"
              className="my-0 mx-auto"
            />

            <span className="font-medium">Hi {firstName},</span>
            <Text className="text-[#121212]">
              We connect to the majority of banks worldwide, making it easier
              for you to keep track of all your expenses and income in one
              place. Filter and compare different time periods to better track
              your business.
            </Text>

            <br />
            <br />

            <Section>
              <Row>
                <Column className="mr-4 block">
                  <Img
                    src={`${baseUrl}/profit-loss.png`}
                    width="245"
                    height="159"
                    alt="Profit/Loss"
                  />
                </Column>
                <Column className="align-top">
                  <Text className="pt-0 mt-0 font-medium">
                    Live profit/loss
                  </Text>
                  <Text className="text-[#707070]">
                    Keep track of your income and profit/loss. If you want you
                    can export the data for a shareable profit/loss.
                  </Text>
                </Column>
              </Row>
              <br />

              <Row>
                <Column className="mr-4 block">
                  <Img
                    src={`${baseUrl}/spending.png`}
                    width="245"
                    height="159"
                    alt="Spending"
                  />
                </Column>
                <Column className="align-top">
                  <Text className="pt-0 mt-0 font-medium">Spending</Text>
                  <Text className="text-[#707070]">
                    Effortlessly boost productivity and collaboration with our
                    advanced time tracking solution: gain insightful project
                    overviews and foster seamless collaboration amongst your
                    team for optimal efficiency and success.
                  </Text>
                </Column>
              </Row>

              <br />

              <Row>
                <Column className="mr-4 block">
                  <Img
                    src={`${baseUrl}/midday-ai.png`}
                    width="245"
                    height="159"
                    alt="Midday AI"
                  />
                </Column>
                <Column className="align-top">
                  <Text className="pt-0 mt-0 font-medium">
                    Ask Midday anything
                  </Text>
                  <Text className="text-[#707070]">
                    Understand your biggest spendings and your biggest incomes.
                    Ask Midday to find transactions without receipts or see
                    revenue patterns.
                  </Text>

                  <Text className="text-[#707070]">Powered by OpenAI</Text>
                </Column>
              </Row>
            </Section>

            <Footer baseUrl={baseUrl} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default FinancialOverviewEmail;