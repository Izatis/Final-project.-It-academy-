import React, { FC, useEffect, useState } from "react";
import s from "./payment.module.scss";

import Image from "next/image";
import { Form, Input, DatePicker, Checkbox, InputNumber } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { IStripePay } from "@/redux/types/payment";

import MyButton from "@/components/UI/Buttons/MyButton/MyButton";
import ParticlesComponent from "@/components/Particles/Particles";
import { courseFee } from "@/redux/reducers/payment.slice";
import { useRouter } from "next/router";

const Payment: FC = () => {
  // Состояния - для данных покупки курсов
  const [payment, setPayment] = useState<IStripePay>({
    cardNumber: "4000002500001001",
    expMonth: 12,
    expYear: 2024,
    cvc: "444",
  });
  const [course, setCourse] = useState<any>({});
  console.log(course);

  const { query }: { query: any } = useRouter();
  const { courses } = useAppSelector((state) => state.course);

  useEffect(() => {
    if (!!query.id) {
      const course = courses.find(({ id }: { id: number }) => id === +query.id);
      console.log(course);

      setCourse(course);
    }
  }, []);

  const dispatch = useAppDispatch();

  const onFinish = (stripePay: IStripePay) => {
    // Достаем токен пользователя
    const parsedToken = JSON.parse(localStorage.getItem("token") as string);
    
    const id = course.id;
    dispatch(courseFee({ id, stripePay, parsedToken }));
    setPayment({
      cardNumber: "",
      expMonth: 0,
      expYear: 0,
      cvc: "",
    });
  };

  // Для сохранения значений инпутов
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...payment });
  }, []);

  return (
    <section className={s.payment}>
      <ParticlesComponent />
      <div className={s.payment__form}>
        <h2>Оформления заказа</h2>
        <p>
          В соответствии с требованиями закона Udemy обязана взыскивать
          применимый налог с покупок, совершенных в рамках соответствующей
          налоговой юрисдикции.
        </p>
        <div className={s.payment__cards}>
          <h4>Метод оплаты </h4>

          <span>
            <Image src="/card-amex.svg" alt="AMEX" width={300} height={112} />
            <Image
              src="/card-discover.svg"
              alt="DISCOVER"
              width={300}
              height={112}
            />
            <Image
              src="/card-mastercard.svg"
              alt="MasterCard"
              width={300}
              height={112}
            />
            <Image src="/card-visa.svg" alt="VISA" width={300} height={112} />
          </span>
        </div>
        <Form
          form={form}
          layout="vertical"
          name="payment-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="cardNumber"
            label="Номер карты"
            rules={[
              {
                required: true,
                message: "Please enter your card number",
              },
            ]}
          >
            <Input
              prefix={<CreditCardOutlined />}
              placeholder="1234 5678 9012 3456"
            />
          </Form.Item>

          <div className={s.container}>
            <Form.Item
              name="expMonth"
              label="Месяц"
              rules={[
                {
                  required: true,
                  message: "Please enter your card number",
                },
              ]}
            >
              <InputNumber min={1} max={12} />
            </Form.Item>

            <Form.Item
              name="expYear"
              label="Год"
              rules={[
                {
                  required: true,
                  message: "Please enter your card number",
                },
              ]}
            >
              <InputNumber min={1} max={6000} />
            </Form.Item>

            <Form.Item
              name="cvc"
              label="CVC"
              rules={[
                {
                  required: true,
                  message: "Please enter CVV",
                },
              ]}
            >
              <Input
                placeholder="CVV"
                onKeyPress={(event) => {
                  const charCode = event.which || event.keyCode;
                  if (charCode < 48 || charCode > 57) {
                    event.preventDefault();
                  }
                }}
                min={3}
                max={3}
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Checkbox>
              Безопасно сохранить эту карту для моих будущих покупок
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <MyButton
              background="#03d665"
              hoverBackground="#7329c2"
              type="primary"

              // loading={loading}
            >
              Pay Now
            </MyButton>
          </Form.Item>
        </Form>
      </div>

      <div>
        <ul className={s.payment__list}>
          <li className={s.payment__title}>Краткое описание</li>
          <li className={s.payment__total}>
            <p>Итого:</p> <span>149,97 $</span>
          </li>
          <li className={s.payment__item}>
            <ul>
              <li> Завершая свою покупку, вы принимаете данные</li>
              <li>Условия предоставления услуг.</li>
              <li>
                <MyButton
                  background="#03d665"
                  hoverBackground="#7329c2"
                  type="primary"
                  // loading={isLoading}
                >
                  Завершить оформления
                </MyButton>
              </li>
              <li> Гарантия возврата денег — 30 дней</li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Payment;
