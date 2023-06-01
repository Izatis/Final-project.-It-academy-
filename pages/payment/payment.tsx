import React, { FC, useEffect, useState } from "react";
import s from "./payment.module.scss";

import Image from "next/image";
import { Form, Input, DatePicker, Checkbox } from "antd";
import { UserOutlined, CreditCardOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { IStripePay } from "@/redux/types/payment";

import MyButton from "@/components/UI/Buttons/MyButton/MyButton";
import paymentSlice from "@/redux/reducers/payment.slice";
import ParticlesComponent from "@/components/Particles/Particles";

const Payment: FC = () => {
  // Состояния - для данных покупки курсов
  const [payment, setPayment] = useState<IStripePay>({
    courseId: 0,
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvc: "",
  });

  const dispatch = useAppDispatch();
  const { token, isLoading, error } = useAppSelector((state) => state.auth);

  const onFinish = (value: IStripePay) => {
    console.log(value);

    // dispatch(paymentSlice(value:)) ;
    setPayment({
      courseId: 0,
      cardNumber: "",
      expMonth: "",
      expYear: "",
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
            name="name"
            label="Имя на карте"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Имя на карте" />
          </Form.Item>

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
              label="Срок действия"
              rules={[
                {
                  type: "object" as const,
                  required: true,
                  message: "Please select time!",
                },
              ]}
            >
              <DatePicker picker="month" placeholder="ММ/ГГ" />
            </Form.Item>
            <Form.Item
              name="cvc"
              label="CVC/CVV"
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
