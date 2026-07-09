---
title: Java Spring Boot Annotations
description: Common Spring Boot and Spring Framework annotations for building Java services.
---

## Mental Model

Annotations are like sticky notes on your code. Spring scans those notes, then decides what objects to create, how to wire them together, and which methods should answer HTTP requests.

## Application Startup

| Annotation | Use |
| --- | --- |
| `@SpringBootApplication` | Main Boot entry point. Combines `@SpringBootConfiguration`, `@EnableAutoConfiguration`, and `@ComponentScan`. |
| `@Configuration` | Declares a class that provides Spring bean definitions. |
| `@Bean` | Registers the returned object as a Spring-managed bean. |
| `@Profile("dev")` | Enables a bean or config only for matching active profiles. |
| `@ConfigurationProperties(prefix = "app")` | Binds grouped config properties into a typed class. |

```java
@SpringBootApplication
public class ApiApplication {
  public static void main(String[] args) {
    SpringApplication.run(ApiApplication.class, args);
  }
}
```

## Component Stereotypes

| Annotation | Use |
| --- | --- |
| `@Component` | Generic Spring-managed class. |
| `@Service` | Business logic component. |
| `@Repository` | Data access component; also helps translate persistence exceptions. |
| `@Controller` | MVC controller that typically returns views. |
| `@RestController` | REST controller. Combines `@Controller` and `@ResponseBody`. |

```java
@Service
public class InvoiceService {
  public InvoiceSummary summarize(UUID invoiceId) {
    return new InvoiceSummary(invoiceId);
  }
}
```

## Dependency Injection

| Annotation | Use |
| --- | --- |
| `@Autowired` | Injects a bean. Constructor injection usually does not need this when there is one constructor. |
| `@Qualifier("beanName")` | Chooses one bean when multiple beans match the same type. |
| `@Primary` | Makes one bean the default candidate. |
| `@Value("${app.name}")` | Injects a simple property value. Prefer `@ConfigurationProperties` for grouped settings. |

```java
@Service
public class OrderService {
  private final PaymentClient paymentClient;

  public OrderService(PaymentClient paymentClient) {
    this.paymentClient = paymentClient;
  }
}
```

## Web Routes

| Annotation | Use |
| --- | --- |
| `@RequestMapping("/api/orders")` | Shared path or mapping metadata for a controller or method. |
| `@GetMapping("/{id}")` | Handles HTTP `GET`. |
| `@PostMapping` | Handles HTTP `POST`. |
| `@PutMapping("/{id}")` | Handles HTTP `PUT`. |
| `@PatchMapping("/{id}")` | Handles HTTP `PATCH`. |
| `@DeleteMapping("/{id}")` | Handles HTTP `DELETE`. |

```java
@RestController
@RequestMapping("/api/orders")
public class OrderController {
  private final OrderService orders;

  public OrderController(OrderService orders) {
    this.orders = orders;
  }

  @GetMapping("/{id}")
  public OrderDto findOrder(@PathVariable UUID id) {
    return orders.findOrder(id);
  }
}
```

## Request Data

| Annotation | Use |
| --- | --- |
| `@PathVariable` | Reads a URI template variable such as `/orders/{id}`. |
| `@RequestParam` | Reads query string or form parameters. |
| `@RequestBody` | Reads the HTTP body, often JSON. |
| `@RequestHeader` | Reads a request header. |
| `@CookieValue` | Reads a cookie value. |
| `@ModelAttribute` | Binds request parameters to an object. |

```java
@PostMapping
public ResponseEntity<OrderDto> createOrder(@Valid @RequestBody CreateOrderRequest request) {
  OrderDto created = orders.createOrder(request);
  return ResponseEntity.status(HttpStatus.CREATED).body(created);
}
```

## Validation

Use Jakarta Bean Validation annotations from `jakarta.validation.constraints`.

| Annotation | Use |
| --- | --- |
| `@Valid` | Tells Spring to validate a request body, form object, or nested object. |
| `@NotNull` | Value must not be `null`. |
| `@NotBlank` | String must contain non-whitespace text. |
| `@Email` | String must be a valid email shape. |
| `@Size(min = 2, max = 80)` | Collection, array, map, or string size bounds. |
| `@Min(1)` / `@Max(100)` | Numeric bounds. |

```java
public record CreateUserRequest(
  @NotBlank String name,
  @Email String email
) {}
```

## Persistence and Transactions

| Annotation | Use |
| --- | --- |
| `@Entity` | Marks a JPA persistence entity. |
| `@Id` | Marks the primary key field. |
| `@GeneratedValue` | Lets the persistence provider generate the id value. |
| `@Column(nullable = false)` | Configures a table column. |
| `@ManyToOne` / `@OneToMany` | Declares entity relationships. |
| `@Transactional` | Runs a method inside a transaction boundary. |

```java
@Entity
public class Product {
  @Id
  @GeneratedValue
  private Long id;

  @Column(nullable = false)
  private String name;
}
```

## Error Handling

| Annotation | Use |
| --- | --- |
| `@ControllerAdvice` | Shared controller-level behavior, commonly exception handling. |
| `@RestControllerAdvice` | `@ControllerAdvice` plus `@ResponseBody` for REST APIs. |
| `@ExceptionHandler` | Handles a specific exception type. |
| `@ResponseStatus(HttpStatus.NOT_FOUND)` | Sets the response status for a handler or exception. |

```java
@RestControllerAdvice
public class ApiExceptionHandler {
  @ExceptionHandler(OrderNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ErrorResponse orderNotFound(OrderNotFoundException ex) {
    return new ErrorResponse(ex.getMessage());
  }
}
```

## Testing

| Annotation | Use |
| --- | --- |
| `@SpringBootTest` | Loads the full Spring application context. |
| `@WebMvcTest(OrderController.class)` | Tests MVC/controller behavior with a smaller web slice. |
| `@DataJpaTest` | Tests JPA repositories and persistence mapping. |
| `@MockBean` | Replaces a bean with a Mockito mock in Boot tests. |
| `@ActiveProfiles("test")` | Runs the test with selected Spring profiles. |

```java
@WebMvcTest(OrderController.class)
class OrderControllerTest {
  @MockBean
  private OrderService orders;

  @Autowired
  private MockMvc mvc;
}
```

## Edge Cases

- Keep the main application class near the root package. `@ComponentScan` starts there by default, so sibling or child packages are discovered.
- Prefer constructor injection. It makes required dependencies obvious and easier to test.
- Avoid putting `@Transactional` on private methods; Spring proxy-based transaction handling needs a proxied method call.
- Use `@RestController` for JSON APIs. Use `@Controller` when returning views.
- Use `jakarta.*` imports with modern Spring Boot 3+ applications, not old `javax.*` validation or persistence imports.

## Official Docs

- [Spring Boot `@SpringBootApplication`](https://docs.spring.io/spring-boot/reference/using/using-the-springbootapplication-annotation.html)
- [Spring Framework component scanning](https://docs.spring.io/spring-framework/reference/core/beans/classpath-scanning.html)
- [Spring MVC annotated controllers](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller.html)
