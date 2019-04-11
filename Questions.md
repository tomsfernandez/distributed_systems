#Trabajo práctico
#Sistemas distribuidos
#### 1 - ¿El servicio es escalable? ¿Qué ocurre con la escalabilidad en tamaño, geográfica y administrativa? ¿Qué límites de tiene?
Sí, el servicio es escalable. Es escalable porque podemos sumar instancias del mismo servicio dando escalabilidad horizontal. Es escalable verticalmente ya que siempre podemos aumentar el tamaño del nodo en el que corre.
Tomando en cuenta la escalabilidad en tamaño, geográfica y administrativa este servicio:
Escala en tamaño ya que siempre podemos seguir agregando instancias o aumentar el tamaño del nodo. El único cuello de botella sería la configuración correcta de la base de datos para que escale acorde.
No escala geográficamente porque en ningún momento estamos teniendo en cuenta algún tipo de replicación geográfica.
No escala administrativamente porque todo el escalamiento es manual y habría que levantar instancias una por una.


#### 2 - ¿Qué técnicas utilizó para mejorar la escalabilidad?

Las técnicas que se utilizaron fueron la técnica de load balancing. Mediante este método se balancea la carga de los requests al servicio entre muchas instancias de ese servicio. Entonces sí se ve que hay poca demanda del servicio, se puede bajar el número de instancias. Por el otro lado, sí hay mucha demanda, se puede subir el número de instancias y esa misma demanda se reparte entre más actores

#### 3 - ¿Qué tipo de particionamiento de la funcionalidad utilizó? (Vertical/Horizontal)


Se utilizó un particionamiento de la funcionalidad vertical. Los servicios se separaron por entidad del dominio y no cross entidades.

#### 4 - Teniendo en cuenta el teorema de CAP ¿Qué propiedad tiene el servicio, consistencia o disponibilidad ?

Teorema CAP sostiene un sistema distribuido no puede asegurar más que 2 de las siguientes características:
Consistencia (Consistency): Cada lectura recibe la escritura más reciente o error.
Disponibilidad (Availability): Ningún request recibe una respuesta de error. No se asegura que contenga la escritura más reciente.
Tolerancia a fallas (Partition tolerance): El sistema continua en operación a pesar de demoras o fallos en el envío de mensajes entre nodos.
Tomando en cuenta estas características se puede decir que el servicio tiene más consistencia que disponibilidad.


#### 5 - Explicar si se logra o no los siguientes tipos de transparencia (Ubicación, Migración, Replicación) y cómo se logra.


#### 6 - ¿Qué tipo de replicación se utilizó, Sincrónica o Asincrónica? ¿Qué ventajas y desventajas tiene el tipo de replicación utilizada?


#### 7 - Si una instancia del servicio falla, ¿funciona el fail-over?, ¿Cómo ?



#### 8 - Con respecto a los principios las arquitecturas SOA. ¿Cómo se representa el contrato del servicio? ¿Qué puede decir con respecto a la encapsulamiento?
El contrato del servicio se representa mediante la interfaz gRPC que utilizan. En los archivos .proto existen los mensajes a los que pueden responder los microservicios y la información que utilizan para responder.
	Al solo especificar los mensajes y no la implementación se mantiene el encapsulamiento ya que puede haber 2 servicios que respetan la misma interfaz pero implementaciones totalmente distintas, por ejemplo en otros lenguajes.
